export default async function UserRegistration() {
  return (
    <>
      <h1 className={`text-3xl text-center text-admin font-bold mt-10`}>
        User Registration
      </h1>
      <form className={`text-admin font-medium w-[60%] mx-auto text-2xl my-10`}>
        <div className="flex justify-around items-center">
          <div className="w-full mr-10">
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="first_name" className="w-[30%] block mb-2">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter First Name"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="last_name" className="w-[30%] block mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Last Name"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="email" className="w-[30%] block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Mobile Number"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="mobile" className="w-[30%] block mb-2">
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Mobile Number"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="role" className="w-[30%] block mb-2">
                Role
              </label>
              <select
                id="role"
                name="role"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin bg-white`}
              >
                <option value={1}>5 Ton</option>
                <option value={2}>6 Ton</option>
                <option value={3}>8 Ton</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-center my-5">
          <button
            type="submit"
            className={`bg-admin hover:underline transition-all duration-300 text-white font-bold py-2 px-4 rounded`}
          >
            Add User
          </button>
        </div>
      </form>
    </>
  );
}
