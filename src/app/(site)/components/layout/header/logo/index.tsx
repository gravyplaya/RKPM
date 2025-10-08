import Link from 'next/link';

const Logo: React.FC = () => {

  return (
    <Link href="/">
      <div className=" dark:hidden font-semibold text-xl">RK Suites</div>
      <div className=" dark:block hidden font-semibold text-xl text-white">RK Suites</div>
    </Link>
  );
};

export default Logo;