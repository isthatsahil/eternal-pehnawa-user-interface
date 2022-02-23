import React from "react";
import { useCustOrdersQuery } from "../../redux/services/custDetails";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import OrderTracker from "./OrderTracker";

const Order = ({ user }) => {
  const { data, isLoading, error } = useCustOrdersQuery(user.id);
  const [refundTracker, setRefundTracker] = React.useState(false);
  React.useEffect(() => {
    console.log("first");
  }, [refundTracker]);
  const OrderList = () => {
    return (
      <>
        {data?.data?.map((order) => {
          return (
            <Accordion
              key={order.id}
              sx={{ width: "50%", margin: "2rem auto" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <List disablePadding sx={{ width: "100%" }}>
                  {order?.order?.line_items?.map((prod) => (
                    <ListItem
                      sx={{ padding: "10px 0" }}
                      key={prod.product_name}
                    >
                      <ListItemAvatar sx={{ marginRight: "1rem" }}>
                        <img
                          src={prod?.image?.url}
                          alt={prod?.product_name}
                          height="65px"
                          width="65px"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={prod?.product_name}
                        secondary={`Quantity : ${prod?.quantity}`}
                      />
                      <ListItemText
                        primary={`Product Price : ${prod?.line_total_with_tax.formatted_with_symbol}`}
                        secondary={`Total Price (including shipping) : ${order?.order?.total_with_tax.formatted_with_symbol}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionSummary>
              <AccordionDetails>
                <OrderTracker
                  order={order}
                  setRefundTracker={setRefundTracker}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </>
    );
  };

  const SkeletonOrderPage = () => {
    return (
      <Stack spacing={1} sx={{ margin: "0 auto" }}>
        <Skeleton variant="text" width={610} height={48} />
        <Skeleton variant="rectangular" width={610} height={118} />
      </Stack>
    );
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {isLoading ? <SkeletonOrderPage /> : <OrderList />}
    </div>
  );
};

export default Order;
