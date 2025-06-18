export function moveTowards(person, destinationPos, speed) {
  let distanceToTravelX = destinationPos.x - person.position.x;
  let distanceToTravelY = destinationPos.y - person.position.y;

  let distance = Math.sqrt(distanceToTravelX**2 + distanceToTravelY**2);

  if (distance <= speed) {
    person.position.x = destinationPos.x;
    person.position.y = destinationPos.y;
  } else {
    let normalizedX = distanceToTravelX / distance;
    let normalizedY = distanceToTravelY / distance;

    person.position.x += normalizedX * speed;
    person.position.y += normalizedY * speed;

    distanceToTravelX = destinationPos.x - person.position.x;
    distanceToTravelY = destinationPos.y - person.position.y;
    distance = Math.sqrt(distanceToTravelX**2 + distanceToTravelY**2);
  }
  
  return distance;

}