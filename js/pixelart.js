var myPixelDraw = {
	colorPicked : "0",
	cellColor: "#ecf0f1",
	defaultCells: "30",
	coloring: "false",

	fns:{
		calcSize:function(cant){
			if (typeof cant === 'undefined') {
                cant = myPixelDraw.defaultCells;
            }
			var cant=cant*cant;
			var cuadrado = myPixelDraw.cuadrado;
			var cuadradoAnch = cuadrado.width();
			cuadrado.empty();
			for (var i = 0; i < cant; i++) {
				cuadrado.append('<div class="cell" draggable></div>');
			}
			var cell = $(".cell");
			var cellTam = cuadradoAnch/ Math.sqrt(cant);
			cell.width(cellTam);
			cell.height(cellTam);
		},
		reSize:function(){
			$("#sizeit").on("click",function() {
				var reSize = $("#reSize").val();
				if (reSize) {
					myPixelDraw.fns.calcSize(reSize);
				} else {
					alert('Ingrese solo numeros equivalentes a los pixeles que quiera <3');
				}
			});
		},
		detectMouseUp:function(){
			$(document).on('mouseup', function() {
				myPixelDraw.coloring = false;
			});
		},
		colorPalette:function(){
			$("#color-pick > *").each(function(){
				var color = $(this).attr('class');
				$(this).css('background', color);
			});
		},
		pickColor:function(){
			$("#color-pick > div").on('click',function(){
				myPixelDraw.colorPicked = $(this).attr('class');
				$(this).parent().find('.select').removeClass('select');
				$(this).addClass('select');
			});
		},
		colorIt:function(){
			$(document).on('mousedown','#cuadrado .cell',function(e){
				e.preventDefault();
				myPixelDraw.coloring=true;
				if (e.button == 2) {
					 $(this).css('background-color',myPixelDraw.cellColor);
				}else{
					$(this).css('background-color',myPixelDraw.colorPicked);
				}
			});
		},
		colorOnDrag:function(){
			$(document).on('mousemove',function(e){
				if (myPixelDraw.coloring==true) {
					var x=e.clientX;
					var y=e.clientY;
					var colorDragTo = document.elementFromPoint(x,y);
					if ($(colorDragTo).hasClass('cell') && e.button!=2) {
						$(colorDragTo).css('background-color',myPixelDraw.colorPicked);
					}else if($(colorDragTo).hasClass('cell') && e.button==2) {
						$(colorDragTo).css('background-color',myPixelDraw.cellColor);
					}
				}
			});
		},
		reset:function(){
			//myPixelDraw.cuadrado.empty();
			$("#reset").on('click',function(){
				var cel=$(".cell");
				$(cel).css('background-color',myPixelDraw.cellColor);
			});
		},
		toggleBorders:function(){
			$("#toggle-border").on('click',function(){
				$('.cell').toggleClass('no-border');
			});
		},
		disableRightClick:function(){
			myPixelDraw.cuadrado.on('contextmenu',function(){
				return false;
			});
		},
		grabImage:function(){
			$("#save").on('click',function(){
				var cuadrado = document.getElementById('cuadrado');
                html2canvas(cuadrado, {
                    onrendered: function(canvas) {
                        document.body.appendChild(canvas);
                    }
                });
			});
		},
	},
	init: function(cuadrado){
		myPixelDraw.cuadrado = cuadrado;
		for (var i = 0; i < Object.keys(myPixelDraw.fns).length; i++) {
			var actualFunction = Object.keys(myPixelDraw.fns)[i];
			myPixelDraw.fns[actualFunction]();
		}
	}
};

$(document).ready(function(){
	var cuadrado= $('#cuadrado');
	myPixelDraw.init(cuadrado);
});