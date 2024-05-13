import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  List,
  ListItem,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import {
  CreditCardIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

const PaymentStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchPaymentStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/Payment/payment-stats"
        );
        setStats(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching payment stats:", error);
      }
    };

    fetchPaymentStats();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  const chartConfigPaymentPerDay = {
    type: "line",
    height: 240,
    series: [
      {
        name: "Payment Per Day",
        data: stats ? stats.paymentPerDay.map((item) => item.total) : [],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },

        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: stats
          ? stats.paymentPerDay.map((item) => formatDate(item._id))
          : [],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  const chartConfig = {
    type: "pie",
    width: 200,
    height: 200,
    series: stats ? [stats.totalCardAmount, stats.totalCashAmount] : [],

    labels: ["Card payments", "Cash payments"],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617", "#ff8f00"],
      legend: {
        show: false,
        position: "bottom", // Adjust position as needed (e.g., 'top', 'bottom', 'right', 'left')
      },
    },
  };

  return (
    <div className="inline-flex">
      <Card className="mr-10 mb-5 w-96">
        <Typography
          variant="h6"
          color="blue-gray"
          className="text-center -mt-2"
        >
          Payments Per Day
        </Typography>
        <CardBody className="px-2 pb-0">
          <Chart {...chartConfigPaymentPerDay} />
        </CardBody>
      </Card>
      <div className="flex-col w-1/2">
        <div className=" ">
          <Card className="p-5 w-full">
            {stats ? (
              <div>
                <Typography variant="h6">
                  Total Revenue : Rs.
                  {parseFloat(stats.totalCardAmount) +
                    parseFloat(stats.totalCashAmount)}
                  .00
                </Typography>
                <Typography variant="h6">
                  Total Payments :
                  {parseInt(stats.totalCardPayments) +
                    parseInt(stats.totalCashPayments)}
                </Typography>
              </div>
            ) : (
              <p>loading...</p>
            )}
          </Card>
        </div>
        <div>
          <Card className="p-2 mt-2 inline-flex ">
            <div className="inline-flex">
              <div>
                {stats ? (
                  <div>
                    <List>
                      <ListItem>
                        <Typography variant="h6">
                          Total Card Payments : Rs.{stats.totalCardAmount}.00
                        </Typography>
                        <ListItemSuffix>
                          <Chip
                            value={stats.totalCardPayments}
                            variant="ghost"
                            size="sm"
                            style={{
                              backgroundColor: "#020617",
                              color: "white",
                            }}
                            className="rounded-full"
                          />
                        </ListItemSuffix>
                      </ListItem>
                      <ListItem>
                        <Typography variant="h6">
                          Total Cash Payments : Rs.{stats.totalCashAmount}.00
                        </Typography>
                        <ListItemSuffix>
                          <Chip
                            value={stats.totalCashPayments}
                            variant="ghost"
                            size="sm"
                            style={{
                              backgroundColor: "#ff8f00",
                              color: "white",
                            }}
                            className="rounded-full"
                          />
                        </ListItemSuffix>
                      </ListItem>
                    </List>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <Chart {...chartConfig} style={{ maxWidth: "100%" }} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentStats;
