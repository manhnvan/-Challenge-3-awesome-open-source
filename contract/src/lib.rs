use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::env::STORAGE_PRICE_PER_BYTE;
use near_sdk::json_types::U64;
use near_sdk::{env, near_bindgen, PanicOnDefault, BorshStorageKey, Balance, AccountId, Promise};
use near_sdk::collections::{UnorderedMap};
use near_sdk::serde::{Deserialize, Serialize};

#[derive(BorshSerialize, BorshStorageKey)]
enum StorageKey {
    Sources,
    StarByPerson,
    NumRepoByPerson,
    TotalFundedByPerson
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Source {
    id: U64,
    title: String,
    repository: String,
    star: u32,
    description: String,
    tech_stack: Vec<String>,
    total_donated: Balance,
    funding_account: AccountId
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct SourceInput {
    title: String,
    repository: String,
    description: String,
    tech_stack: Vec<String>,
    funding_account: AccountId
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    sources: UnorderedMap<u64, Source>,
    source_id_serial: u64,
    total_funded: Balance,
    star_by_person: UnorderedMap<AccountId, u32>,
    mun_repo_by_person: UnorderedMap<AccountId, u32>,
    total_funded_by_person: UnorderedMap<AccountId, Balance>
}

#[near_bindgen]
impl Contract {

    #[init]
    pub fn new() -> Self {
        Self {
            sources: UnorderedMap::new(StorageKey::Sources),
            source_id_serial: 0,
            total_funded: 0,
            star_by_person: UnorderedMap::new(StorageKey::StarByPerson),
            mun_repo_by_person: UnorderedMap::new(StorageKey::NumRepoByPerson),
            total_funded_by_person: UnorderedMap::new(StorageKey::TotalFundedByPerson)
        }
    }

    #[payable]
    pub fn create(&mut self, source_input: SourceInput) -> Promise {
        let initial_storage_usage = env::storage_usage();
        let account_id = env::predecessor_account_id();
        self.source_id_serial += 1;
        let source_id = self.source_id_serial;
        let source = Source {
            id: U64::from(source_id),
            star: 0,
            total_donated: 0,
            repository: source_input.repository,
            description: source_input.description,
            tech_stack: source_input.tech_stack,
            funding_account: source_input.funding_account,
            title: source_input.title,
        };

        self.sources.insert(&source_id, &source);
        let num_repo_by_owner = if let Some(num_repo) = self.mun_repo_by_person.get(&account_id) {
            num_repo + 1
        } else {
            1u32
        };

        self.mun_repo_by_person.insert(&account_id, &num_repo_by_owner);

        let attached_deposit = env::attached_deposit();

        let required_storage_in_bytes = env::storage_usage() - initial_storage_usage;

        let refund_value = attached_deposit - Balance::from(required_storage_in_bytes) * STORAGE_PRICE_PER_BYTE;

        Promise::new(account_id).transfer(refund_value)
    }

    #[payable]
    pub fn give_an_star(&mut self, source_id: U64) -> Promise {
        let initial_storage_usage = env::storage_usage(); 
        let attached_deposit = env::attached_deposit();
        let account_id = env::predecessor_account_id();
        
        // update source
        let source = &mut self.sources.get(&source_id.0).expect("source not found");
        source.star += 1;
        source.total_donated += attached_deposit;

        self.sources.insert(&source_id.0, source);

        // update star by account
        let star_by_account = if let Some(star) = self.star_by_person.get(&account_id) {
            star + 1
        } else {
            1
        };

        self.star_by_person.insert(&account_id, &star_by_account);

        let total_funded_by_account = if let Some(fund) = self.total_funded_by_person.get(&account_id) {
            fund + attached_deposit
        } else {
            attached_deposit
        };

        // update total funded by account
        self.total_funded_by_person.insert(&account_id, &total_funded_by_account);


        // update total funded
        self.total_funded += attached_deposit;


        let required_storage_in_bytes = env::storage_usage() - initial_storage_usage;

        let funded_to_owner = attached_deposit - Balance::from(required_storage_in_bytes) * STORAGE_PRICE_PER_BYTE;

        Promise::new(source.funding_account.clone()).transfer(funded_to_owner)
    }

    pub fn get_sources(&self, start: U64, limit: u32) -> Vec<Source> {
        self.sources
            .keys()
            .skip(start.0 as usize)
            .take(limit as usize)
            .map(|source_id| {
                self.sources.get(&source_id).unwrap()
            })
            .collect()
    }

}