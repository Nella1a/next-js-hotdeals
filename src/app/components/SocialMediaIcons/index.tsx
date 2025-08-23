import Facebook from '../Icons/facebook';
import Instagram from '../Icons/instagram';
import Pinterest from '../Icons/pinterest';

const SocialMediaIcons = () => {
  return (
    <ul className="flex gap-2 md:gap-4 w-20 md:w-25">
      <li className="w-3xs">
        <Facebook />
      </li>
      <li className="w-3xs">
        <Pinterest />
      </li>
      <li className="w-3xs">
        <Instagram />
      </li>
    </ul>
  );
};

export default SocialMediaIcons;
