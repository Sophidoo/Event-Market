

const Account = () => {

    return <>
        <form>
            <div className="settingsSectionHeading mb-[-10px]">
                <h2>Account</h2>
                <p className="text-gray-500">Withdrawals will be made to the account filled in here</p>
            </div>

            <hr className="border-[1px] border-gray-200 bg-gray-200"/>
            
            <section className="mt-[-10px]">
                <div className="inputWrapper">
                    <label htmlFor="" className="text-gray-700">Account Name</label>
                    <p>The account name must match with your verified account name</p>
                    <input type="text" className="border border-gray-300"/>
                </div>
                <div className="inputContainer">
                    <div className="inputWrapper">
                        <label htmlFor="" className="text-gray-700">Account Number</label>
                        <p>Enter your account number</p>
                        <input type="text" className="border border-gray-300"/>
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="" className="text-gray-700">Bank Name</label>
                        <p>Enter your banck name</p>
                        <input type="text" className="border border-gray-300"/>
                    </div>
                </div>
                <div className="inputContainer">
                    <div className="inputWrapper">
                        <label htmlFor="" className="text-gray-700">Swift Code / BIC</label>
                        <p>This is optional, only for countries that require it</p>
                        <input type="text" className="border border-gray-300"/>
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="" className="text-gray-700">Branch</label>
                        <p>This is optional</p>
                        <input type="text" className="border border-gray-300"/>
                    </div>
                </div>
            </section>

            <hr className="border-[1px] border-gray-200 bg-gray-200"/>

            <div className="settingsButton">
                <button className="bg-[#0B544C] text-white hover:bg-green-950">Save Changes</button>
            </div>
        </form>
    </>

}

export default Account