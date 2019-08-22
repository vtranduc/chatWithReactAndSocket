const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// If you are not attempting open the server, then this can be commented out

// app.get("/", function(req, res) {
//   res.send("<h1>Hello Wold</h1>");
// });

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("chat message", function(msg) {
    console.log("message: ", JSON.stringify(msg));
    io.emit("chat message", msg);
  });
});

http.listen(3001, function() {
  console.log("listening on Port 3001");
});
