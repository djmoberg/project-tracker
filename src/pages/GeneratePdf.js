// import React, { Component } from 'react';

// import { calculateHours, getTotalHours } from '../utils'
// import { getPdf } from '../APIish'

// import { Button, Segment } from 'semantic-ui-react'

// let pdfMake = require('pdfmake/build/pdfmake.js')
// let vfs = require('pdfmake/build/vfs_fonts.js')
// pdfMake.vfs = vfs.pdfMake.vfs

// export default class GeneratePdf extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {

//         }
//     }

//     isCurrentlySelected(overview) {
//         return ((this.props.selectedMonth === (new Date(overview.workDate).getMonth()).toString()
//             || this.props.selectedMonth === "Alle")
//             && (this.props.selectedYear === (new Date(overview.workDate).getFullYear())
//                 || this.props.selectedYear === "Alle"))
//     }

//     filterOverview(overview) {
//         return overview.filter(overview => {
//             return this.isCurrentlySelected(overview)
//         })
//     }

//     overviewTable() {
//         let body = [['Dato', 'Tid', 'Timer', 'Kommentar', 'Sum']]
//             .concat(this.filterOverview(this.props.overview).map(row =>
//                 [
//                     row.workDate,
//                     row.workFrom + "-" + row.workTo,
//                     calculateHours(row.workFrom, row.workTo),
//                     row.comment,
//                     { text: calculateHours(row.workFrom, row.workTo) * this.props.wage + " kr", alignment: "right" }
//                 ]
//             )).concat([[
//                 { text: "Sum", border: [false, true, false, false], bold: true },
//                 "",
//                 "",
//                 "",
//                 { text: getTotalHours(this.filterOverview(this.props.overview)) * this.props.wage + ' kr', alignment: "right", bold: true }
//             ]])

//         let table = {
//             headerRows: 1,
//             widths: ['auto', 'auto', 'auto', '*', 'auto'],
//             body
//         }

//         return table
//     }

//     getDocDefinition() {
//         return {
//             content: [
//                 { text: 'Faktura for perioden ', fontSize: 30 },
//                 { text: 'Antall Timer: ' + getTotalHours(this.filterOverview(this.props.overview)), fontSize: 20 },
//                 { text: 'Beløp: ' + getTotalHours(this.filterOverview(this.props.overview)) * this.props.wage + ' kr', fontSize: 20 },
//                 {},
//                 { text: 'Grunnlag', fontSize: 25, alignment: 'center' },
//                 {
//                     layout: 'lightHorizontalLines', // optional
//                     table: this.overviewTable()
//                 }
//             ]
//         }
//     }

//     // docDefinition = {
//     //     content: [
//     //         { text: 'Faktura for perioden ', fontSize: 30 },
//     //         { text: 'Antall Timer: ' + getTotalHours(this.state.overview), fontSize: 20 },
//     //         { text: 'Beløp: ' + getTotalHours(this.state.overview) * this.props.wage + ' kr', fontSize: 20 },
//     //         {},
//     //         { text: 'Grunnlag', fontSize: 25, alignment: 'center' },
//     //         {
//     //             layout: 'lightHorizontalLines', // optional
//     //             table: this.overviewTable()
//     //         }
//     //     ]
//     // };

//     generatePdf = () => {
//         pdfMake.createPdf(this.getDocDefinition()).download("faktura.pdf")
//     }

//     render() {
//         return (
//             <Segment basic textAlign="center" >
//                 <Button
//                     content="Generer pdf"
//                     // onClick={() => this.generatePdf()}
//                     onClick={() => getPdf({
//                         overview: this.props.overview,
//                         selectedMonth: this.props.selectedMonth,
//                         selectedYear: this.props.selectedYear,
//                         wage: this.props.wage
//                     }, (res) => {
//                         console.log(res)
//                     })}
//                 />
//             </Segment>
//         )
//     }
// }