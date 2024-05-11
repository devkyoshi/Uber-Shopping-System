import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

export default function AnnouncementCard({ announcement }) {
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-[300px] overflow-hidden rounded-lg sm:w-[350px] transition-all">
      <Link to={`/announcement/${announcement.slug}`}>
        <img
          src={announcement.image}
          alt="post cover"
          className="h-[180px] w-full object-cover group-hover:h-[140px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-2 flex flex-col gap-1">
        <Typography className="text-base font-semibold line-clamp-2">
          {announcement.title}
        </Typography>
        <span className="italic text-xs">{announcement.category}</span>
        <Typography>
          <Link
            to={`/announcement/${announcement.slug}`}
            className="z-10 group-hover:bottom-0 absolute bottom-[-180px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-1 rounded-md !rounded-tl-none m-1"
          >
            Read article
          </Link>
        </Typography>
      </div>
    </div>
  );
}
