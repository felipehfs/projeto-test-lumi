import { ApexOptions } from 'apexcharts';
import { Container } from './ChartItem.styles'
import Chart from "react-apexcharts";


export type ChartItemProps = {
    categories: string[]
    series: ApexOptions["series"]
}

function ChartItem({categories, series }: ChartItemProps) {

    const data = {
    options: {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories,
        }
    },
    series,
};
    return (
        <Container>
            <Chart
                options={data.options}
                series={data.series}
                type="bar"
            />
        </Container>
    )
}

export default ChartItem
