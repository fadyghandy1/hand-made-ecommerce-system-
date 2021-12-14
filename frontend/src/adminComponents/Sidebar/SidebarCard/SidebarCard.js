import { Card } from "primereact/card";
import "./SidebarCard.scss";

const SidebarCard = (props) => {
    return (
        <>
            <div className="p-col-3">
                <Card className={props.css}>
                    <div className="d-item">
                        <div>
                            <i className={`pi ${props.icon}`}/><br />
                            <span className="name">{props.name}</span>
                        </div>
                        <span className="number">{props.stats}</span>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default SidebarCard;
