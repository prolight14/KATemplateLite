window.PJSLoader = (function(Processing, window)
{
    function defaultCode(pjs)
    {
        pjs.size(400, 400);
        pjs.background(255, 255, 255);
        pjs.angleMode = "degrees";
            
        pjs.mousePressed = function() {};
        pjs.mouseReleased = function() {};
        pjs.mouseMoved = function() {};
        pjs.mouseDragged = function() {};
        pjs.mouseClicked = function() {};
        pjs.mouseOver = function() {};
        pjs.mouseOut = function() {};
        pjs.keyPressed = function() {};
        pjs.keyReleased = function() {};
        pjs.keyTyped = function() {};

        pjs.debug = function() 
        {
            console.log.apply(console.log, arguments);
        };

        pjs.Program = {
            restart: function() 
            {
                window.location.reload();
            },
            assertEqual: function(equivalent) 
            {
                if(!equivalent) 
                {
                    console.warn(equivalent);
                }
            },
        };

        pjs.getSound = function(name)
        {
            console.log("`getSound` is not supported in KATemplate Lite");

            return  document.createElement("source");
        };
        pjs.playSound = function(source, volume)
        {
            console.log("`playSound` is not supported in KATemplate Lite");

            var sound = new Audio();
            sound.volume = typeof volume === "number" ? vol : 1;
            sound.appendChild(source);
            sound.play().catch(); 
        };

        pjs.getImage = function(name)
        {
            console.log("`getImage` is not supported in KATemplate Lite");

            return pjs.get(0, 0, 1, 1);
        };
    }

    function genPJS()
    {
        var args = Array.prototype.slice.call(arguments);
		args.push({ beginCode: "with(pjs)\n{", endCode: "\n}"});
        var withdCode = combine.apply(this, args);
        var canvas = document.getElementById("canvas");

        var finalCode = combine(defaultCode, withdCode);
        return new Processing(canvas, finalCode);
    }

    function load()
    {
        return window.processing = genPJS.apply(null, arguments);
    }

    function combine(a, c)
	{
		var args = Array.prototype.slice.call(arguments);
		var config = {};

		var funcArgs = "";
		var join = "";
		for(var i = 0; i < args.length; i++)
		{
			if(typeof args[i] === "object")
			{
				config = args[i];
				continue;
			}

			var to = args[i].toString();

			var temp = to.substring(to.indexOf('(') + 1, to.indexOf(')'));

			if(temp !== "" && temp !== " ")
			{
				funcArgs += temp + ",";
			}

			join += to.slice(to.indexOf('{') + 1, -1);
		}

		funcArgs = funcArgs.slice(0, -1);
		
		return new Function("return function any(" + funcArgs + "){" + (config.beginCode || "").replace("\n", "") + join + (config.endCode || "") + "}")();
    }

    return {
        load: load
    };
}(Processing, window));

