"use client"


import React, { useState } from "react";
// import Header from "@/app/(components)/Header";
import Header from '../dashboard/Header'


type UserSetting = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

const mockSettings: UserSetting[] = [
  { label: "Username", value: "john_doe", type: "text" },
  { label: "Email", value: "john.doe@example.com", type: "text" },
  { label: "Notification", value: true, type: "toggle" },
  { label: "Dark Mode", value: false, type: "toggle" },
  { label: "Language", value: "English", type: "text" },
];

const Settings = () => {
  const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings);

  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUserSettings(settingsCopy);
  };

  return (
    <div className="w-full">
      <Header  headerName="User Settings" />
      <div className="overflow-x-auto mt-2 shadow-md">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Setting
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (
              <tr className="hover:bg-blue-50" key={setting.label}>
                <td className="py-2 px-4">{setting.label}</td>
                <td className="py-2 px-4">
                  {setting.type === "toggle" ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.value as boolean}
                        onChange={() => handleToggleChange(index)}
                      />
                      <div
                        className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
                        transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:bg-blue-600"
                      ></div>
                    </label>
                  ) : (
                    <input
                      type="text"
                      className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                      value={setting.value as string}
                      onChange={(e) => {
                        const settingsCopy = [...userSettings];
                        settingsCopy[index].value = e.target.value;
                        setUserSettings(settingsCopy);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;




































// import React, { useState } from 'react'
// import Header from '../dashboard/Header'

// const Settings = () => {
//     const [value, setValue] = useState<boolean>(false)
//     const handleChange = ()=>{
//         setValue(!value)
//     }
//   return (
//     <div className='flex flex-col w-full h-screen'>
//         <Header headerName='User Settings' />
//         <table className='w-full bg-white mx-5 shadow-sm rounded'>
//             <tr className='text-left bg-gray-900 text-gray-200  '>
//                 <th className='px-2 py-2 text-xs'>SETTING</th>
//                 <th className='py-2'>VALUE</th>
//             </tr>
//             <tr>
//                 <td className='py-2 px-2'>Username</td>
//                 <td className='py-2'><input className='border outline-none  bg-white border-gray-200 px-2 rounded-sm' type="text" name="username" id="username" value='John_doe' /></td>
//             </tr>
//             <tr>
//                 <td className='py-2 px-2'>Email</td>
//                 <td className='py-2'><input className='border outline-none bg-white border-gray-200 px-2 rounded-sm' type="text" name="email" id="email" value='john@gmail.com' /></td>
//             </tr>
//             <tr>
//                 <td className='py-2 px-2'>Notification</td>
//                 <td className='py-2'>
//                     <div className='relative cursor-pointer inline-flex items-center'>
//                         <input className='sr-only peer z-10' checked={value} onChange={handleChange} type='checkbox'/>
//                         {/* <div className='peer peer-focus:ring-blue-400 peer-focus:ring-4 w-10 h-6 bg-blue-500 rounded-full after:absolute after:h-4 after:top-1 after:left-[2px] after:w-4 after:rounded-full after:bg-white peer-checked:after:translate-x-full after:transition-all transition'>
//                         </div> */}
//                         <div
//                         className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
//                         transition peer-checked:after:translate-x-full peer-checked:after:border-white 
//                         after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
//                         after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
//                         peer-checked:bg-blue-600"
//                       ></div>
//                     </div>
//                     </td>
//             </tr>
//             <tr>
//                 <td className='py-2 px-2'>Dark Mode</td>
//                 <td className='py-2'><input className='border bg-white border-gray-200 px-2 rounded-sm' type="text" name="email" id="email" value='John@gmail.com' /></td>
//             </tr>
//             <tr>
//                 <td className='py-2 px-2'>Language</td>
//                 <td className='py-2'><input className='border outline-none bg-white border-gray-200 px-2 rounded-sm' type="text" name="language" id="language" value='English' /></td>
//             </tr>
//         </table>
//     </div>
//   )
// }

// export default Settings