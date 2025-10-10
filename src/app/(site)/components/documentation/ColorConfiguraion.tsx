export const ColorConfiguration = () => {
    return (
        <>
            <h3 className=" text-black text-xl font-semibold mt-8 dark:text-white" >Colors</h3>
            <div className="p-6 rounded-md border mt-4 border-border dark:border-dark_border">
                <p className="text-base font-medium text-midnight_text dark:text-gray" ><span className="font-semibold text-lg dark:text-white">1. Override Colors</span> <br />
                    For any change in colors : src/utils/extendedConfig.ts</p>
                <div className="py-4 px-5 rounded-md bg-black mt-8">
                    <p className="text-sm text-lightgray flex flex-col gap-2">
                       <span>primary: &quot;#2F73F2&quot;,</span>
                       <span>secondary: &quot;#547593&quot;,</span>
                       <span>midnight_text: &quot;#102D47&quot;,</span>
                       <span>gray: &quot;#668199&quot;,</span>
                       <span>border: &quot;#6bc5f94d&quot;,</span>
                       <span>light: &quot;#F0F6FA&quot;,</span>
                       <span>section: &quot;#F8FAFC&quot;,</span>
                       <span>darkmode: &quot;#0c121e&quot;,</span>
                       <span>semidark: &quot;#0e1624&quot;,</span>
                       <span>darklight: &quot;#1F2A37&quot;,</span>
                       <span>dark_border: &quot;#224767&quot;,</span>
                       <span>herobg: &quot;#D1F2FF&quot;,</span>
                       <span>cyan: &quot;#46C4FF&quot;,</span>
                       <span>lightgray:&quot;#e5e7eb&quot;,</span>
                       <span>darkgray:&quot;#374151&quot;,</span>
                    </p>
                </div>
            </div>
            <div className="p-6 rounded-md border mt-4 border-border dark:border-dark_border">
                <p className="text-base font-medium text-midnight_text dark:text-gray" ><span className="font-semibold text-lg dark:text-white">2. Override Theme Colors</span> <br />
                    For change , go to : src/utils/extendedConfig.ts</p>
                <div className="py-4 px-5 rounded-md bg-black mt-8">
                    <p className="text-sm text-lightgray flex flex-col gap-2">
                       <span>primary: &quot;#2F73F2&quot;,</span>
                       <span>secondary: &quot;#547593&quot;,</span>
                    </p>
                </div>
            </div>
        </>
    )
}