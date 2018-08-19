{/* <svg id="lineContainer">
<line x1="0" y1="0" x2="0" y2="0" stroke="black" id="versionConnector1"/>
<line x1="0" y1="0" x2="0" y2="0" stroke="black" id="versionConnector2"/>
</svg>
<!-- <svg ><line id="versionConnector1"/></svg> --> */}

// const updateLines = () => {
//   const pyVersDivCoords = document.getElementById("pyVersDiv").getBoundingClientRect()
//   const tuVersDivCoords = document.getElementById("tuVersDiv").getBoundingClientRect()
//   const curVersDivCoords = document.getElementById("curVersDiv").getBoundingClientRect()
//   const lineContainer = document.getElementById("lineContainer").getBoundingClientRect()
//   const line1 = document.getElementById("versionConnector1")
//   const line2 = document.getElementById("versionConnector2")

//   line1.setAttribute('x1', pyVersDivCoords.right  - lineContainer.left)
//   line1.setAttribute('y1', pyVersDivCoords.top - lineContainer.top + 20)
//   line1.setAttribute('x2', curVersDivCoords.left - lineContainer.left)
//   line1.setAttribute('y2', curVersDivCoords.top - lineContainer.top + 20)
//   line1.setAttribute('stroke', 'red')

//   line2.setAttribute('x1', tuVersDivCoords.right  - lineContainer.left)
//   line2.setAttribute('y1', tuVersDivCoords.top - lineContainer.top + 20)
//   line2.setAttribute('x2', curVersDivCoords.left - lineContainer.left)
//   line2.setAttribute('y2', curVersDivCoords.top - lineContainer.top + 40)
//   line2.setAttribute('stroke', 'red')
// }

import _ from 'lodash'

export const aggregateData = (data, groupField, sumByFields) => {
  const totals = _.zipObject(sumByFields, _.fill(Array(sumByFields.length), 0))
  const groupedData = _(data).groupBy(groupField).map((v, k) => {
    let subtotals = _.zipObject(sumByFields, _.fill(Array(sumByFields.length), 0))
    return (
      {
        category: k,
        sums: v.reduce((total, obj) => {
          sumByFields.forEach(k => {
            totals[k] += obj[k]
            return subtotals[k] = total[k] + obj[k]
          })
          return subtotals
        }, subtotals),
        differences: v
      }
    )
  }).value()

  return { groupedData, totals }
}


const excludeSidebarInViews = ["versionSelect", "versionNew"]
export const showSidebar = (r) => !excludeSidebarInViews.includes(r)


export const mutationParametersFromObject = (obj) => {
  let exportString = ''
  _.forOwn(obj, (v, k) => {
    if (v !== null) {
      if (isNaN(v) || v === "") {
        exportString += k + ': "' + v + '", '
      } else {
        exportString += k + ': ' + v * 1 + ', '
      }
    }
  })
  return exportString
}