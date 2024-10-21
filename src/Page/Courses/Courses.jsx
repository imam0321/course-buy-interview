import useCourses from "../../Hooks/useCourses";
import Loader from "../../Utils/Loader/Loader";
import Course from "./Course";

const Courses = () => {
  const [courses, loading] = useCourses();

  return (
    <div className="">
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Course key={course.id} course={course}></Course>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
