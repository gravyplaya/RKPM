import React from "react";
import { signIn } from "next-auth/react";


const SocialSignIn = () => {
  const handleGoogleSignIn = async () => {
    await signIn("google");
  };
  const handleFacebookSignIn = async () => {
    await signIn("facebook");
  };
  return (
    <>
      <div className="flex gap-4">
        <button
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-border dark:border-dark_border  p-3.5 text-dark duration-200 ease-in dark:border-darkborder dark:text-white dark:hover:bg-primary/10 hover:!bg-primary/10"
        >
          Sign In
          <svg
            width="23"
            height="22"
            viewBox="0 0 23 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_709_8846)">
              <path
                d="M22.5001 11.2438C22.5134 10.4876 22.4338 9.73256 22.2629 8.995H11.7246V13.0771H17.9105C17.7933 13.7929 17.5296 14.478 17.1352 15.0914C16.7409 15.7047 16.224 16.2335 15.6158 16.646L15.5942 16.7827L18.9264 19.3124L19.1571 19.335C21.2772 17.4161 22.4997 14.5926 22.4997 11.2438"
                fill="#4285F4"
              />
              <path
                d="M11.7245 22C14.755 22 17.2992 21.0221 19.1577 19.3355L15.6156 16.6464C14.6679 17.2944 13.3958 17.7467 11.7245 17.7467C10.3051 17.7385 8.92433 17.2926 7.77814 16.472C6.63195 15.6515 5.77851 14.4981 5.33892 13.1755L5.20737 13.1865L1.74255 15.8142L1.69727 15.9376C2.63043 17.7602 4.06252 19.2925 5.83341 20.3631C7.60429 21.4337 9.64416 22.0005 11.7249 22"
                fill="#34A853"
              />
              <path
                d="M5.33889 13.1755C5.09338 12.4753 4.96669 11.7404 4.96388 11C4.9684 10.2608 5.09041 9.52685 5.32552 8.8245L5.31927 8.67868L1.81196 6.00867L1.69724 6.06214C0.910039 7.5938 0.5 9.28491 0.5 10.9999C0.5 12.7148 0.910039 14.406 1.69724 15.9376L5.33889 13.1755Z"
                fill="#FBBC05"
              />
              <path
                d="M11.7249 4.25337C13.3333 4.22889 14.8888 4.8159 16.065 5.89121L19.2329 2.86003C17.2011 0.992106 14.5106 -0.0328008 11.7249 3.27798e-05C9.64418 -0.000452376 7.60433 0.566279 5.83345 1.63686C4.06256 2.70743 2.63046 4.23965 1.69727 6.06218L5.32684 8.82455C5.77077 7.50213 6.62703 6.34962 7.77491 5.5295C8.9228 4.70938 10.3044 4.26302 11.7249 4.25337Z"
                fill="#EB4335"
              />
            </g>
            <defs>
              <clipPath id="clip0_709_8846">
                <rect
                  width="22"
                  height="22"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </button>

        <button
          onClick={handleFacebookSignIn}
          className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-border dark:border-dark_border p-3.5 text-dark duration-200 ease-in dark:border-darkborder dark:text-white dark:hover:bg-primary/10 hover:bg-primary/10"
        >
          Sign In
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 11C22 4.92487 17.0751 0 11 0S0 4.92487 0 11C0 16.4913 3.65684 21.1283 8.4375 21.8785V14.1797H5.89844V11H8.4375V8.57812C8.4375 6.07812 9.93047 4.6875 12.2145 4.6875C13.3088 4.6875 14.4531 4.89062 14.4531 4.89062V7.375H13.1922C11.9496 7.375 11.5625 8.13281 11.5625 8.91016V11H14.3359L13.8926 14.1797H11.5625V21.8785C16.3432 21.1283 20 16.4913 20 11Z"
              fill="#1877F2"
            />
            <path
              d="M13.8926 14.1797L14.3359 11H11.5625V8.91016C11.5625 8.13281 11.9496 7.375 13.1922 7.375H14.4531V4.89062C14.4531 4.89062 13.3088 4.6875 12.2145 4.6875C9.93047 4.6875 8.4375 6.07812 8.4375 8.57812V11H5.89844V14.1797H8.4375V21.8785C9.24766 22.0405 10.1234 22.0405 11.5625 21.8785V14.1797H13.8926Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default SocialSignIn;
