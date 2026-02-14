import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../core/store/hooks";
import TaskList from "../components/tasks/TaskList";

const Home: React.FC = () => {
  const { user, error } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {user ? (
          <TaskList />
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Please log in or register.
            </h2>
            <div className="flex flex-col gap-y-4">
              <Link
                to="/auth"
                className="w-full text-white bg-blue-500 p-3 rounded-md hover:bg-blue-600 font-medium"
              >
                Login / Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
