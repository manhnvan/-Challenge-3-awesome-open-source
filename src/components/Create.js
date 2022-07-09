import React, { useState } from "react";

function Create(props) {

    const {setDisplayCreateModal} = props

    const [title, setTitle] = useState()
    const [repository, setRepository] = useState()
    const [description, setDescription] = useState()
    const [fundingAccount, setFundingAccount] = useState()

    const handleSubmit = async () => {
        
        if (!title || !repository || !description || !fundingAccount) {
            alert('please fill out the form')
            return
        } 
        await window.contract.create(
            {
                source_input: {
                    title,
                    repository,
                    description,
                    tech_stack: [],
                    funding_account: fundingAccount
                }
            },
            3000000000000,
            "300000000000000000000000"
        )
    }

    return (
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                    <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3
                                        className="text-lg leading-6 font-medium text-gray-900"
                                        id="modal-title"
                                    >
                                        Share your work!
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            You are sharing something to make our world better.
                                        </p>
                                        <p className="text-sm text-red-500">
                                            Please make sure that your funding account is placed in
                                            the heading of your repository's readme.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="pr-5">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <div className="mt-3">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <input type="text" onChange={(e) => setTitle(e.target.value)} name="price" id="title" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 sm:text-sm border-gray-300 rounded-md" placeholder="Title" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <div className="mt-3">
                                        <label htmlFor="repository" className="block text-sm font-medium text-gray-700">Repository</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <input type="text" onChange={(e) => setRepository(e.target.value)} name="price" id="repository" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 sm:text-sm border-gray-300 rounded-md" placeholder="Github url" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <div className="mt-3">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <textarea
                                                className="
                                                    form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                                                onChange={(e) => setDescription(e.target.value)}
                                                id="exampleFormControlTextarea1"
                                                rows="3"
                                                placeholder="Some description"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                            <div className="mt-3">
                                                <label htmlFor="funding-account" className="block text-sm font-medium text-gray-700">Funding account</label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <input type="text" onChange={(e) => setFundingAccount(e.target.value)} name="price" id="funding-account" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 sm:text-sm border-gray-300 rounded-md" placeholder="Account receiving the tip" />
                                                </div>
                                            </div>
                                        </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Share
                            </button>
                            <button
                                onClick={() => setDisplayCreateModal(false)}
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;
