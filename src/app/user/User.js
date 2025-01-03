import React from 'react';

const User = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <nav className="flex items-center justify-between bg-white shadow-md px-6 py-4">
                    <div className="flex items-center space-x-6">
                        <div className="text-lg font-bold text-blue-600">Technotch</div>
                        <ul className="flex items-center space-x-6">
                            <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Home</li>
                            <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Dashboard</li>
                            <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Projects</li>
                            <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Tasks</li>
                        </ul>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="text-gray-500 hover:text-blue-500">
                            <i className="fas fa-cog"></i>
                        </button>
                        <img
                            src="https://via.placeholder.com/40"
                            alt="User Profile"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </div>
                </nav>

                <main className="p-6">
                    <section className="text-center">
                        <img
                            src="https://via.placeholder.com/100"
                            alt="User Profile"
                            className="w-24 h-24 mx-auto rounded-full mb-4"
                        />
                        <h1 className="text-2xl font-bold mb-2">Welcome, John Doe!</h1>
                        <p className="text-gray-700">Here is an overview of your account and activity.</p>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="p-4 bg-white rounded-md shadow-md">
                                <h2 className="text-lg font-semibold">Your Projects</h2>
                                <p>Manage your active repositories and contributions.</p>
                            </div>
                            <div className="p-4 bg-white rounded-md shadow-md">
                                <h2 className="text-lg font-semibold">Notifications</h2>
                                <p>Stay updated with your latest activity.</p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}

export default User;
