import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

import engagementHelper from '@helpers/engagement-helper'
import {
    channels,
    messageCountList
} from '../mock/mock-data'

function EngagementMessagesOverTime() {
    const options = engagementHelper.engagementMessageOverTimeChartOptions(messageCountList, channels)

    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </>
    )
}

export default EngagementMessagesOverTime
