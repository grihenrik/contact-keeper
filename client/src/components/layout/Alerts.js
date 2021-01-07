import React, { useContext } from "react";
import { Card, Icon } from "semantic-ui-react";
import AlertContext from "../../context/alert/alertContext";

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  return (
    <>
      {alertContext.alerts.length > 0 &&
        alertContext.alerts.map((alert) => (
          <Card key={alert.id} fluid>
            <Card.Content
              as="h2"
              style={{ background: alert.type === "danger" ? "red" : "white" }}
            >
              <Card.Header
                style={{ color: alert.type === "danger" ? "white" : "red" }}
              >
                {" "}
                <Icon size="big" name="info circle" />
                {alert.msg}
              </Card.Header>
            </Card.Content>
          </Card>
        ))}
    </>
  );
};

export default Alerts;
