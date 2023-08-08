import Highcharts from "highcharts"

/**
 * Generates a dynamic Highcharts series object from input data.
 * Organizes data points into series based on channel names and timestamps.
 *
 * @param {Array} data - An array of objects containing channel data with channelName, messageCount, and timestamp.
 * @returns {Array} An array of Highcharts series objects, each representing a channel's data.
 */
function generateSeriesFromData (data) {
    const seriesData = {}
    
    data.forEach(item => {
        if (!seriesData[item.channelName]) {
            seriesData[item.channelName] = []
        }
        
        seriesData[item.channelName].push([
            item.timestamp,
            item.messageCount
        ])
    })
    
    return Object.entries(seriesData).map(([channelName, dataPoints]) => ({
        name: channelName,
        data: dataPoints
    }))
}

function engagementMessageOverTimeChartOptions (messageCountList, channels) {
    const formattedMessageData = messageCountList.map(messageData => {
        const channelId = messageData.channelId
        const channelInfo = channels.find((channel) => channel.id === channelId)

        return channelInfo
            ? {
                channelName: channelInfo.name,
                messageCount: parseInt(messageData.count),
                timestamp: new Date(messageData.timeBucket).getTime()
            }
            : null
    }).filter(Boolean)

    const options = {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Discord Analytics'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // formats date in '10 Oct' style
                day: '%e %b'
            },
            tickInterval: 24 * 3600 * 1000, // one day in milliseconds
        },
        yAxis: {
            title: {
                text: 'Messages'
            }
        },
        tooltip: {
            formatter: function () { // formats the tooltip on chart
                return `
                    <strong>${this.series.name}</strong>
                    <br />
                    <span>${this.y} ${ this.y !== 1 ? 'messages' : 'message' } on ${Highcharts.dateFormat('%e %b', this.x)}</span>
                `
            }
        },
        series: generateSeriesFromData(formattedMessageData)
    }

    return options
}

export default {
    engagementMessageOverTimeChartOptions
}