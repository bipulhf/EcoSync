export default async function STSRegistration() {
  return (
    <>
      <h1 className={`text-3xl text-center text-admin font-bold mt-10`}>
        Secondary Transfer Station (STS) Registration
      </h1>
      <form className={`text-admin font-medium w-[60%] mx-auto text-2xl my-10`}>
        <div className="flex justify-around items-center">
          <div className="w-full mr-10">
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="ward_no" className="w-[30%] block mb-2">
                Ward No
              </label>
              <input
                type="text"
                id="ward_no"
                name="ward_no"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Ward No"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="capacity" className="w-[30%] block mb-2">
                Capacity
              </label>
              <input
                type="text"
                id="capacity"
                name="capacity"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter STS Capacity"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="latitude" className="w-[30%] block mb-2">
                Latitude
              </label>
              <input
                type="text"
                id="latitude"
                name="latitude"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Vehicle Number"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="longitude" className="w-[30%] block mb-2">
                Longitude
              </label>
              <input
                type="text"
                id="longitude"
                name="longitude"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Vehicle Number"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="capacity" className="w-[30%] block mb-2">
                Capacity
              </label>
              <select
                id="capacity"
                name="capacity"
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
            Add STS
          </button>
        </div>
      </form>
    </>
  );
}
