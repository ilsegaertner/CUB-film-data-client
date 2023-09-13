// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Col, Row, Figure, Button, Card } from "react-bootstrap";
// import "./profile-view.scss";

// const favoriteList = ({}) => {
//   let token = localStorage.getItem("token");
//   let url = `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${localStorage.getItem(
//     "user"
//   )}/movies/${Title}`;

//   fetch(`https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${localStorage.getItem("user")}/movies/${Title}`),

//   return (
//     <Card>
//       <Card.Body>
//         <Row>
//           <Col xs={12}>
//             <h2>Favorite Movies</h2>
//           </Col>
//         </Row>
//         <Row>
//           {favoriteList.map(({ ImagePath, Title, _id }) => {
//             return (
//               <Col xs={12} md={6} lg={3} key={_id} className="fav-movie">
//                 <Figure>
//                   <Link to={`/movies/${Title}`}>
//                     <Figure.Image src={ImagePath} alt={Title} />
//                     <Figure.Caption>{Title}</Figure.Caption>
//                   </Link>
//                 </Figure>
//                 <Button variant="secondary" onClick={() => removeFav(_id)}>
//                   Remove
//                 </Button>
//               </Col>
//             );
//           })}
//         </Row>
//       </Card.Body>
//     </Card>
//   );
// };
