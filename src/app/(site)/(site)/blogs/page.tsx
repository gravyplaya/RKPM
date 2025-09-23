
import BlogCard from "@/app/(site)/components/shared/blog/blogCard";
import HeroSub from "@/app/(site)/components/shared/hero-sub";
import { getAllBlogs } from "@/utils/payload-utils";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | RKPM",
};

const Blog = async () => {
    const posts = await getAllBlogs();
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/blogs", text: "Blog List" },
    ];

    return (
        <>
            <HeroSub
                title="Blog List"
                description="Letraset sheets containing Lorem Ipsum passages and more recently with desktop publishing Variou"
                breadcrumbLinks={breadcrumbLinks}
            />
            <section className="flex flex-wrap justify-center dark:bg-darkmode px-4">
                <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto ">
                    <div className="grid grid-cols-12 lg:gap-14 gap-6">
                        {posts.map((blog, i) => (
                            <div key={i} className="w-full col-span-12 lg:col-span-6">
                                <BlogCard blog={blog} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Blog;
