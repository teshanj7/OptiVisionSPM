// import React, { useEffect, useState } from "react";
// import { getBackendData } from "../../helper/helper";

// export default function ResultTable() {

//     const [qdata, setQData] = useState([])

//     useEffect(() => {
//         getBackendData('http://localhost:8040/api/result', (res) => {
//             setQData(res);
//         })
//     })

//     return (
//         <div>
//             <table>
//                 <thead className="table-header">
//                     <tr className="table-row">
//                         <td>Name</td>
//                         <td>Attempts</td>
//                         <td>Earn Points</td>
//                         <td>Result</td>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {!qdata ?? <div>No data found</div>}
//                     {
//                         qdata.map((n, i) => (
//                             <tr className="table-body" key={i}>
//                                 <td>{n?.username || ''}</td>
//                                 <td>{n?.attempts || 0}</td>
//                                 <td>{n?.points || 0}</td>
//                                 <td>{n?.achived || ""}</td>
//                             </tr>
//                         ))
//                     }
//                 </tbody>
//             </table>
//         </div>
//     )
// }