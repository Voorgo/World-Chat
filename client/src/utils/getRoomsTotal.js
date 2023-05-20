export const getRoomsTotal = (data) => {
  let total = 0;
  if (data) {
    data.map((item) => {
      total += item.rooms.length;
    });
  } else {
    total = 0;
  }

  return total;
};
