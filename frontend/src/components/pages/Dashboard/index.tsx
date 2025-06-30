import { useUser } from "../../../context/UserContext";
import { supabase } from "../../../supabaseClient";

const Dashboard = () => {
  const { user } = useUser();
  console.log({ user });
  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard!</h1>
      <p>This page is protected and only visible after login.</p>
    </div>
  );
};

export default Dashboard;
