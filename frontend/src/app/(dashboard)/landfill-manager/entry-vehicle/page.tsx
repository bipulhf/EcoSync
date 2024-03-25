export default function EntryVehicle() {
  return (
    <form className="text-landfill font-medium text-2xl w-[50%] mx-auto my-10">
      <h1 className="text-4xl text-landfill font-bold text-center my-10">
        Entry of vehicle leaving from Landfill
      </h1>

      <div className="mb-4">
        <label htmlFor="vehicle_number" className="block mb-2">
          Vehicle Number:
        </label>
        <input
          type="text"
          id="vehicle_number"
          name="vehicle_number"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-landfill"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="waste_volume" className="block mb-2">
          Waste Volume:
        </label>
        <input
          type="text"
          id="waste_volume"
          name="waste_volume"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-landfill"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-landfill hover:underline transition-all duration-300 text-white font-bold py-2 px-4 rounded"
        >
          Add Entry
        </button>
      </div>
    </form>
  );
}
