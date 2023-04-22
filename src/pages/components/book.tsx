import { IconButton, Link } from "@chakra-ui/react";

interface BookProps {
  label: string;
  icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

const Book: React.FC<BookProps> = ({ icon, label }) => {
  return (
    <div>
      <Link>
        <IconButton aria-label={label} icon={icon} />
      </Link>
    </div>
  );
};

export default Book;
