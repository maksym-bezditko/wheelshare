import "./index.css";
import Header from "../../components/Header";
import ProfileCard from "../../components/ProfileCard";

const ProfilePage = () => {
  return (
    <>
      <Header />
      <main>
        <div className="description-wrapper no-upper-offset">
          <ProfileCard />
        </div>
      </main>
    </>
  );
};

export default ProfilePage;