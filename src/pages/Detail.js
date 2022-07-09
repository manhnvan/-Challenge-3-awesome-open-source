import { parseNearAmount } from 'near-api-js/lib/utils/format';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { login } from '../utils';

function Detail(props) {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const [repo, setRepo] = useState()
    const [donate, setDonate] = useState()

    useEffect(() => {
        const repo = {}
        for (const [key, value] of searchParams.entries()) {
            repo[key] = value
        }
        setRepo(repo)

        if (repo.transactionHashes) {
            navigate('/')
        }
    }, [])

    const handleSubmit = async () => {
        if (!window.walletConnection.isSignedIn()) {
            await login()
            return
        }
        if (isNaN(donate)) {
            alert("invalid donation")
            return
        } 
        await window.contract.give_an_star(
            {source_id: repo.id},
            3000000000000,
            parseNearAmount(donate)
        )
    }

    return (
        <div className='container mx-auto mt-10'>
            <h1 className='text-center text-5xl'>Repository # {repo?.id}: {repo?.title}</h1>
            <p className='text-center text-2xl text-gray-500 mt-5'>{repo?.description}</p>
            <p className='text-center text-2xl text-blue-500 font-bold mt-5'>{repo?.star} stars, funded {repo?.total_donated} NEAR</p>
            <p className='text-center text-1xl hover:text-blue-900 text-blue-500 font-bold mt-5'><a href={repo?.repository}>{repo?.repository}</a></p>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left text-center mx-auto">
                <div className="mt-5 text-center">
                    <label htmlFor="funding-account" className="block text-lg font-medium text-gray-700">By  <a target="_blank" href={`https://explorer.testnet.near.org/accounts/${repo?.funding_account}`} className="text-blue-900">{repo?.funding_account}</a> a cup of coffee</label>
                    <div className="mt-1 relative rounded-md shadow-sm justify-center">
                        <input type="number" onChange={(e) => setDonate(e.target.value)} name="price" id="title" className="focus:ring-indigo-500 focus:border-indigo-500 block px-3 sm:text-sm border-gray-300 rounded-md mx-auto" placeholder="Enter amount in NEAR" />
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 my-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                    >
                        Send a cup of coffee
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Detail;