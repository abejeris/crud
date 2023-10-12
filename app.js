// const express = require('express');

// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.get('/tacos', (req, res) => {
// 	res.send('GET /tacos response');
// });

// app.post('/tacos', (req, res) => {
// 	const { meat, qty } = req.body;
// 	res.send(`OK, you just ordered ${qty} portions of ${meat}`);
// });

// app.listen(3000, () => {
// 	console.log('listening on port 3000');
// });

//THE ABOVE IS JUST A DEMO FOR GET AND POST ROUTES//////////////////////////////////////////

const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

const comments = [
	{ id: uuidv4(), username: 'todd', comment: 'hahaha so funny' },
	{ id: uuidv4(), username: 'antanas', comment: 'NU KA TU KAIMIETi' },
	{ id: uuidv4(), username: 'John', comment: 'I AM Bon jovi' },
	{ id: uuidv4(), username: 'Jovi', comment: 'No you are not bon jovi, i am' },
];

// getting all comment
app.get('/comments', (req, res) => {
	res.render('comments/index', { comments });
});

// creating the form for new post
app.get('/comments/new', (req, res) => {
	res.render('comments/new');
});

// posting data from comments form from req.body and adding to array of all comments, then redirecting page so it doesnt stay with post method if refreshed
app.post('/comments', (req, res) => {
	const { username, comment } = req.body;
	comments.push({ username, comment, id: uuidv4() });
	res.redirect('/comments');
});

// getting post by id
app.get('/comments/:id', (req, res) => {
	const { id } = req.params;
	const comment = comments.find((c) => c.id === id);
	res.render('comments/show', { comment });
});

// patching only the comment, rest stays unchanged..
app.patch('/comments/:id', (req, res) => {
	const { id } = req.params;
	const newCommentText = req.body.comment;
	const comment = comments.find((c) => c.id === id);
	comment.comment = newCommentText;
	res.redirect('/comments');
});

// getting post for editing
app.get('/comments/:id/edit', (req, res) => {
	const { id } = req.params;
	const comment = comments.find((c) => c.id === id);
	res.render('comments/edit', { comment });
});

app.listen(3000, () => {
	console.log('listening on port 3000');
});
