import { Link } from "react-router-dom";
import Emp_CallToAction from "../components/Emp_CallToAction";
import { useEffect, useState } from "react";
import AnnouncementCard from "../components/AnnouncementCard";
import {
  Card,
  Typography,
  Button,
  Input,
  Popover,
  ListItemSuffix,
  PopoverHandler,
  PopoverContent,
  Chip,
  ListItem,
} from "@material-tailwind/react";

export default function Emp_Home() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const res = await fetch("/api/announcement/getannouncement?limit=6");
      const data = await res.json();
      setAnnouncements(data.announcements);
    };
    fetchAnnouncements();
  }, []);
  return (
    <div className="bg">
      <Card className="flex flex-col mt-16 mb-5 p-5 max-w-6xl mx-auto ">
        <Typography variant="h1" className=" font-bold ">
          Welcome Employees
        </Typography>
        <Typography className="text-gray-500 text-xs sm:text-sm">
          "Welcome to our food-loving team! At UBER DELIVERY, we're thrilled to
          have you join our delivery family. Get ready to bring smiles to hungry
          customers' faces one order at a time. Let's deliver deliciousness
          together!"
        </Typography>
        <Typography>
          <Link
            to="/Dashboard?tab=profile"
            className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
          >
            To Profile
          </Link>
        </Typography>
      </Card>
      <Card className="p-3 bg-amber-100 dark:bg-slate-700 ml-20 mr-20">
        <Emp_CallToAction />
      </Card>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {announcements && announcements.length > 0 && (
          <div className="flex flex-col gap-6">
            <Typography
              variant="h2"
              className="text-2xl font-semibold text-center"
            >
              Recent Posts
            </Typography>
            <div className="grid grid-cols-3 gap-5">
              {announcements.map((announcement) => (
                <AnnouncementCard
                  key={announcement._id}
                  announcement={announcement}
                />
              ))}
            </div>

            <Link
              to={"/Emp_search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              <Typography>View all announcements</Typography>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
