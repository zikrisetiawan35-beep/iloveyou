<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Love Code Editor</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(to right, #ffafbd, #ffc3a0);
            overflow: hidden;
        }
        .editor {
            width: 60%;
            height: 40%;
            background: #333;
            color: #fff;
            padding: 20px;
            border-radius: 10px;
            font-family: monospace;
            white-space: pre;
            animation: glow 1.5s infinite alternate;
        }
        @keyframes glow {
            0% { box-shadow: 0 0 10px #ff677d; }
            100% { box-shadow: 0 0 20px #ff677d; }
        }
        .message {
            animation: fadeIn 3s infinite alternate;
        }
        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="editor">
        <div class="message">I Love you Wina</div>
    </div>
</body>
</html>
