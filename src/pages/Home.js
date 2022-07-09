import React, { useEffect, useState } from 'react';
import Create from '../components/Create'
import add from '../assets/add.png'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import { login } from '../utils';


function Home(props) {

    const navigate = useNavigate()

    const [displayCreateModal, setDisplayCreateModal] = useState(false)
    const [listRepo, setListRepo] = useState([])

    useEffect(() => {
        window.contract.get_sources({ start: "0", limit: 100 }).then(result => setListRepo(result))
    }, [])

    return (
        <>
            <div className='container mx-auto'>
                <div className='hero-section justify-center text-center'>
                    <h1 className='mt-10 text-8xl font-bold text-blue-400'>Share your works,</h1>
                    <h1 className='mt-10 text-6xl font-semibold'>And tips the other's Awesome works !!!</h1>
                    <p className='mt-10 text-gray-400 text-3xl'>Our world is being built by code</p>
                    <p className='text-gray-400 text-3xl'>Share them, and give other developers a cup of coffee</p>
                    <p className='text-gray-400 text-3xl'>Together, make our world better!</p>
                    <button
                        type="button"
                        onClick={() => {
                            const element = document.getElementById("list-repos");
                            element.scrollIntoView();
                        }}
                        className="bg-white mt-10 text-2xl bg-gray-700 font-semibold px-3 py-2 rounded-md text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                        See some Awesome works
                    </button>
                </div>
                <div className='list-repos mb-10' id='list-repos' >

                </div>
            </div>
            <div className="fixed bottom-5 right-8" onClick={() => {
                if (!window.walletConnection.isSignedIn()) return login()
                setDisplayCreateModal(true)
            }}>
                <img className='block h-12 w-auto cursor-pointer hover:scale-110' src={add} />
            </div>
            <div className='list-repo container flex flex-wrap justify-start mt-10 mx-auto mb-10'>
                {listRepo.map(repo => {
                    return (
                        <div className="max-w-sm rounded overflow-hidden drop-shadow-2xl bg-white cursor-pointer ml-5 my-10" key={repo.id}>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2" onClick={() => navigate({
                                    pathname: "detail",
                                    search: createSearchParams(repo).toString()
                                })}>{repo.title}</div>
                                <p className="text-gray-700 text-base">
                                    {repo.description}
                                </p>
                                <a href={repo.repository} target="_blank" className="text-blue-400 text-sm">{repo.repository}</a><br />
                                <p className="text-gray-700 text-base text-sm" >Send fund to: <a target="_blank" href={`https://explorer.testnet.near.org/accounts/${repo.funding_account}`} className="text-blue-400 text-sm">{repo.funding_account}</a></p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{repo.star} stars</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">funded {repo.total_donated} NEAR</span>
                            </div>
                        </div>
                    )
                })}
            </div>
            {displayCreateModal && <Create setDisplayCreateModal={setDisplayCreateModal} />}
        </>
    );
}

export default Home;