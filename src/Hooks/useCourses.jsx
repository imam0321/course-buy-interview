import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCourses = () => {
  const axiosInstance = useAxiosSecure();

  const {
    refetch,
    data: courses = [],
    isLoading: loading,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/get-course-list");
      return res.data.courseData;
    },
  });

  return [courses, loading, refetch];
};

export default useCourses;
