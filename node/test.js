
//==================================process===============================
// process.stdout.write("hello");
//默认情况下，输入流是关闭的，要监听处理输入流数据，首先要开启输入流
// process.stdin.resume();
//
// process.stdin.on('data', function(chunk){
//
//     console.log('用户输入了...', chunk.toString())
// })

//计算机的demo
// process.stdin.resume();
//
// var a;
// var b;
//
// process.stdout.write('请输入a的值 ');
//
// process.stdin.on('data', function(chunk) {
//
//     if(!a){
//         a = Number(chunk.toString());
//
//         process.stdout.write('请输入b的值 ');
//     } else {
//
//         b = Number(chunk.toString());
//
//         var result = a+ b;
//         process.stdout.write('结果是 ' + result);
//     }
// })


//=============================buffer=========================






























