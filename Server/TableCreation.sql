CREATE TABLE ledger (
  id int(11) NOT NULL AUTO_INCREMENT,
  fromUUID text,
  fromName text,
  toUUID text,
  toName text,
  Amount text,
  Detail text,
  Status text,
  Date text,
  createdAt date,
  PRIMARY KEY (id)
);

CREATE TABLE transaction (
  id int(11) NOT NULL AUTO_INCREMENT,
  Email text,
  uuidBy text,
  Date text,
  Title text,
  Amount text,
  Type text,
  catIdx text,
  Category text,
  Description text,
  createdAtUnix text,
  createdAt date,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  uuid text,
  Email text,
  Password text,
  Salt text,
  Name text,
  Phone text,
  themeIsDark text,
  createdAt date,
  updatedAt date,
  PRIMARY KEY (id)
);

-- CREATE TABLE restaurantlist (
--   id int(11) NOT NULL AUTO_INCREMENT,
--   name text,
--   uuid text,
--   Address text,
--   closingTime text,
--   openingTime text,
--   openDays text,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE menuitems (
--   id int(11) NOT NULL AUTO_INCREMENT,
--   resName text,
--   resUUID text,
--   serialNum text,
--   itemName text,
--   itemPrice text,
--   itemCategory text,
--   itemSubCategory text,
--   PRIMARY KEY (id)
-- );

create TABLE jiodetails (
  id int(11) NOT NULL AUTO_INCREMENT,
  jioUUID text,
  creatorUUID text,
  creatorName text,
  jioTitle text,
  jioComments text,
  jioStatus text,
  unixCreatedAt text,
  PRIMARY KEY (id)
);

CREATE TABLE jiousers (
  id int(11) NOT NULL AUTO_INCREMENT,
  jioUUID text,
  peepsUUID text,
  orderObj text,
  resIdx text,
  orderPlaced text,
  PRIMARY KEY (id)
);