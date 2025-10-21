import "../App.css";

export default function NoteBox() {
  return (
    <>
      <div className="w-4xs h-50 bg-white border-gray-200 hover:border-blue-500 border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="p-5">
          <h1 className="font-bold text-[20px]">Title</h1>
          <p className="w-2xs h-30">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti
            ad distinctio, quasi assumenda obcaecati vitae? Temporibus
            reiciendis accusantium quasi eius deserunt dolor sit amet
            consectetur.
          </p>
        </div>
      </div>
    </>
  );
}
