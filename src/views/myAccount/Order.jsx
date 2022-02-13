import React from "react";
import { useCustOrdersQuery } from "../../redux/services/custDetails";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

const Order = ({ user }) => {
  const { data, loading, error } = useCustOrdersQuery(user.id);

  const OrderList = () => {
    return (
      <>
        {data?.data?.map((order) => {
          return (
            <Accordion key={order.id} sx={{ width: "50%" }}>
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
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </>
    );
  };
  return (
    !loading && (
      <div>
        Order
        <OrderList />
      </div>
    )
  );
};

export default Order;
