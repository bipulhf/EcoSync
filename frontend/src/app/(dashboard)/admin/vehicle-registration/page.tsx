export default async function UserProfile() {
  return (
    <>
      <h1 className={`text-3xl text-center text-admin font-bold mt-10`}>
        Vehicle Registration
      </h1>
      <form className={`text-admin font-medium w-[60%] mx-auto text-2xl my-10`}>
        <div className="flex justify-around items-center">
          <div className="w-full mr-10">
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="vehicle_number" className="w-[30%] block mb-2">
                Vechicle Number
              </label>
              <input
                type="text"
                id="vehicle_number"
                name="vehicle_number"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Vehicle Number"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="vehicle_type" className="w-[30%] block mb-2">
                Vechicle Type
              </label>
              <select
                id="vehicle_type"
                name="vehicle_type"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin bg-white`}
              >
                <option value={1}>Car</option>
                <option value={2}>Car</option>
                <option value={3}>Car</option>
              </select>
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
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="vehicle_number" className="w-[30%] block mb-2">
                Driver Name
              </label>
              <input
                type="text"
                id="driver_name"
                name="driver_name"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Vehicle Number"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="driver_name" className="w-[30%] block mb-2">
                Driver Mobile
              </label>
              <input
                type="text"
                id="driver_mobile"
                name="driver_mobile"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Vehicle Number"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center my-5">
          <button
            type="submit"
            className={`bg-admin hover:underline transition-all duration-300 text-white font-bold py-2 px-4 rounded`}
          >
            Add Vehicle
          </button>
        </div>
      </form>
    </>
  );
}
