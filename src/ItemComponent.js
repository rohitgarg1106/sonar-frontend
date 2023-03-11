import React, {useState, useEffect} from 'react'
import ItemService from '../src/services/ItemService';

function ItemComponent() {

    const [items, setItems] = useState([])

    useEffect(() => {
        getItems()
    }, [])

    const getItems = () => {

        ItemService.getItems().then((response) => {
            setItems(response.data)
            console.log(response.data);
        });
    };

    return (
        <div className = "container">
            
            <h1 className = "text-center"> Items List</h1>

            <table className = "table table-striped">
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Item Code </th>
                        <th> Name </th>
                        <th> Status </th>
                        <th> Location </th>
                    </tr>

                </thead>
                <tbody>
                    {
                        items.map(
                                item =>
                                <tr key = {item.id}>
                                    <td> {item.id }</td>
                                    <td> {item.itemCode }</td>
                                    <td> {item.name }</td>    
                                    <td> {item.status }</td>
                                    <td> {item.location }</td>

                                </tr>

                        )
                    }

                </tbody>


            </table>

            <img src="http://maps.googleapis.com/maps/api/staticmap?center=37.4241876,-122.0917381&zoom=11&size=200x200&sensor=false"></img>

        </div>
    )
}

export default ItemComponent