var canvas=document.getElementById("canvas");
var ctx=canvas.getContext('2d');
var row=60;
var col=60;
var width=10;
var start=false;
var arr;
var dx,dy,ddx,ddy;
function update()
{
  row=document.getElementById("r").value;
  if(row==0)
  {
    alert("rows cant be zero");
    row=60;
    return;
  }
  col=document.getElementById("c").value;
  if(col==0)
  {
    alert("col cant be zero");
    col=60;
    return;
  }
  width=Number(document.getElementById("w").value);
  if(width==0)
  {
    alert("width cant be zero");
    width=10;
    return;
  }
  var w=row*width;
  var h=col*width;
  document.getElementById("canvas").width=w;
  document.getElementById("canvas").height=h;
  document.getElementById("canvas").style.visibility="visible";
  init();
}
function init()
{
  arr = new Array(row);
  for(var i=0;i<row;i++)
  {
    arr[i]=new Array(col);
  }
  for(var i=0;i<row;i++)
  {
    for(var j=0;j<col;j++)
      arr[i][j]=false;
  }
  dx=[-width,width,0,0];
  dy=[0,0,width,-width];
  ddx=[-width,-width,width,width];
  ddy=[-width,width,-width,width];
}
function color(e)
{
  if(start)
  return;
  var x=e.clientX;
  var y=e.clientY;
   arr[Math.floor(x/width)][Math.floor(y/width)]=true;
  ctx.fillRect(Math.floor(x/width)*width,Math.floor(y/width)*width,width,width);
}
canvas.addEventListener('click',color);
function startSimulation()
{
//  console.log(arr);
  start=true;
  for(var i=0;i<row;i++)
  {
    for(var j=0;j<col;j+=1)
    {
      var isalive=arr[i][j];
      var cnt=0;
        for(var k=0;k<4;k++)
        {
          var X=i*width+dx[k];
          var Y=j*width+dy[k];
          //console.log(i,j,dx[k],dx[k]);
          pixelData=ctx.getImageData(X+1,Y+1,1,1);
          if( pixelData.data[3]==255)
          {
            cnt++;
          }
        //  console.log(X,Y);
        }
        for(var k=0;k<4;k++)
        {
          var X=i*width+ddx[k];
          var Y=j*width+ddy[k];
          pixelData=ctx.getImageData(X+1,Y+1,1,1);
          if( pixelData.data[3]==255)
          {
            cnt++;
          }
          //console.log(X,Y);
        }
        if(isalive && cnt>=2 && cnt<=3)
        {
            arr[i][j]=true;
        }
        else if(!isalive && cnt==3)
        {
          arr[i][j]=true;
        }
        else{
          arr[i][j]=false;
        }
        //console.log(cnt,i,j);
    }
  }
  ctx.clearRect(0,0,canvas.width,canvas.height);
//console.log(arr,row,col,width);
  for(var i=0;i<row;i+=1)
  {
    for(var j=0;j<col;j+=1)
    {
      if(arr[i][j]==true)
      {
        ctx.fillRect(i*width,j*width,width,width);
      }
    }
  }
  window.requestAnimationFrame(startSimulation);
}
