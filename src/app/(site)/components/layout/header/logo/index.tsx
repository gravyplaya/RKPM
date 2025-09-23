import Link from 'next/link';

const Logo: React.FC = () => {

  return (
    <Link href="/">
      <div className=" dark:hidden font-semibold text-xl">RKPM</div>
      <div className=" dark:block hidden font-semibold text-xl text-white">RKPM</div>
    </Link>
  );
};

export default Logo;