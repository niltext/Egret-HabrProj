var egret = window.egret;window.skins={};
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/eui_skins/eui/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/eui/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/eui/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/eui/HSliderSkin.exml","eui.Panel":"resource/eui_skins/eui/PanelSkin.exml","eui.TextInput":"resource/eui_skins/eui/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/eui/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/eui/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/eui/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/eui/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/eui/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/eui/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/eui/ItemRendererSkin.exml"};generateEUI.paths['resource/eui_skins/common/HttpLockSkin.exml'] = window.HttpLockSkin = (function (_super) {
	__extends(HttpLockSkin, _super);
	function HttpLockSkin() {
		_super.call(this);
		this.skinParts = ["labelGroup"];
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Rect1_i(),this.labelGroup_i()];
	}
	var _proto = HttpLockSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.bottom = 0;
		t.fillAlpha = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.labelGroup_i = function () {
		var t = new eui.Group();
		this.labelGroup = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Rect2_i(),this._Label1_i()];
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillAlpha = 0.8;
		t.height = 200;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 0;
		t.width = 200;
		t.x = 260;
		t.y = 540;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 35;
		t.text = "加载中...";
		t.verticalCenter = 0;
		t.x = 293;
		t.y = 623;
		return t;
	};
	return HttpLockSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/common/TipsSkin.exml'] = window.TipsSkin = (function (_super) {
	__extends(TipsSkin, _super);
	function TipsSkin() {
		_super.call(this);
		this.skinParts = ["msgLabel"];
		
		this.height = 50;
		this.width = 300;
		this.elementsContent = [this._Rect1_i(),this.msgLabel_i()];
	}
	var _proto = TipsSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.bottom = 0;
		t.fillAlpha = 0.8;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.msgLabel_i = function () {
		var t = new eui.Label();
		this.msgLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 50;
		t.horizontalCenter = 1;
		t.multiline = true;
		t.text = "您还没有卡";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 300;
		return t;
	};
	return TipsSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/eui/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/eui/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/eui/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/eui/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/eui/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/eui/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/eui/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/eui/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/eui/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/eui/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/eui/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/eui/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/eui/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/scene/game/menu/TopMenuUISkin.exml'] = window.TopMenuUISkin = (function (_super) {
	__extends(TopMenuUISkin, _super);
	function TopMenuUISkin() {
		_super.call(this);
		this.skinParts = ["headBg","headImg","headMask","goldImg","goldLab","factoryNameImg","factoryBar","factoryBarMask","factoryLevelLab","curPt","lastPt","nextPt"];
		
		this.height = 200;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this.headBg_i(),this.headImg_i(),this.headMask_i(),this.goldImg_i(),this.goldLab_i(),this.factoryNameImg_i(),this._Image2_i(),this._Image3_i(),this.factoryBar_i(),this.factoryBarMask_i(),this._Group1_i(),this._Image4_i(),this.curPt_i(),this.lastPt_i(),this.nextPt_i()];
	}
	var _proto = TopMenuUISkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.scale9Grid = new egret.Rectangle(100,16,30,63);
		t.source = "topmenu_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.headBg_i = function () {
		var t = new eui.Image();
		this.headBg = t;
		t.height = 63;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "topmenu_head_png";
		t.width = 63;
		t.x = 9;
		t.y = 9;
		return t;
	};
	_proto.headImg_i = function () {
		var t = new eui.Image();
		this.headImg = t;
		t.height = 63;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "topmenu_head_png";
		t.width = 63;
		t.x = 9;
		t.y = 9;
		return t;
	};
	_proto.headMask_i = function () {
		var t = new eui.Image();
		this.headMask = t;
		t.height = 61;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "topmenu_head_png";
		t.width = 61;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto.goldImg_i = function () {
		var t = new eui.Image();
		this.goldImg = t;
		t.anchorOffsetX = 17;
		t.anchorOffsetY = 17;
		t.source = "com_gold_light_png";
		t.x = 91;
		t.y = 40;
		return t;
	};
	_proto.goldLab_i = function () {
		var t = new eui.BitmapLabel();
		this.goldLab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "topmenu_gold_font_fnt";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.text = "99.99K";
		t.x = 110;
		t.y = 24;
		return t;
	};
	_proto.factoryNameImg_i = function () {
		var t = new eui.Image();
		this.factoryNameImg = t;
		t.horizontalCenter = 0;
		t.source = "topmenu_name1_png";
		t.y = 7.69;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "topmenu_house_png";
		t.x = 541;
		t.y = 20;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "topmenu_barbg_png";
		t.x = 595;
		t.y = 24;
		return t;
	};
	_proto.factoryBar_i = function () {
		var t = new eui.Image();
		this.factoryBar = t;
		t.source = "topmenu_bar_png";
		t.x = 595;
		t.y = 24;
		return t;
	};
	_proto.factoryBarMask_i = function () {
		var t = new eui.Rect();
		this.factoryBarMask = t;
		t.height = 39;
		t.width = 98;
		t.x = 595;
		t.y = 24;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 39;
		t.width = 98;
		t.x = 595;
		t.y = 24;
		t.elementsContent = [this.factoryLevelLab_i()];
		return t;
	};
	_proto.factoryLevelLab_i = function () {
		var t = new eui.BitmapLabel();
		this.factoryLevelLab = t;
		t.font = "topmenu_level_font_fnt";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "99";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "topmenu_productbg_png";
		t.x = 257;
		t.y = 81;
		return t;
	};
	_proto.curPt_i = function () {
		var t = new eui.Image();
		this.curPt = t;
		t.horizontalCenter = 0;
		t.source = "topmenu_pt_cur_png";
		t.verticalCenter = 14;
		return t;
	};
	_proto.lastPt_i = function () {
		var t = new eui.Image();
		this.lastPt = t;
		t.horizontalCenter = -67;
		t.source = "topmenu_pt_last_png";
		t.verticalCenter = 14.5;
		return t;
	};
	_proto.nextPt_i = function () {
		var t = new eui.Image();
		this.nextPt = t;
		t.horizontalCenter = 58.5;
		t.source = "topmenu_pt_next_png";
		t.verticalCenter = 12;
		return t;
	};
	return TopMenuUISkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/scene/game/meter/EffectMeterUISkin.exml'] = window.EffectMeterUISkin = (function (_super) {
	__extends(EffectMeterUISkin, _super);
	function EffectMeterUISkin() {
		_super.call(this);
		this.skinParts = ["maxIcon","proBar","proMask"];
		
		this.height = 150;
		this.width = 100;
		this.elementsContent = [this.maxIcon_i(),this._Image1_i(),this.proBar_i(),this._Image2_i(),this._Image3_i(),this.proMask_i()];
	}
	var _proto = EffectMeterUISkin.prototype;

	_proto.maxIcon_i = function () {
		var t = new eui.Image();
		this.maxIcon = t;
		t.source = "meter_4_png";
		t.x = 1.5;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "meter_1_png";
		t.x = 18.5;
		t.y = 21;
		return t;
	};
	_proto.proBar_i = function () {
		var t = new eui.Image();
		this.proBar = t;
		t.source = "meter_3_png";
		t.x = 18.5;
		t.y = 21;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "meter_0_png";
		t.x = 18.5;
		t.y = 21;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "meter_2_png";
		t.x = 18.5;
		t.y = 21;
		return t;
	};
	_proto.proMask_i = function () {
		var t = new eui.Rect();
		this.proMask = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 122;
		t.height = 122;
		t.width = 50;
		t.x = 16;
		t.y = 147;
		return t;
	};
	return EffectMeterUISkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/scene/game/workdesk/WorkDeskSkin.exml'] = window.WorkDeskSkin = (function (_super) {
	__extends(WorkDeskSkin, _super);
	function WorkDeskSkin() {
		_super.call(this);
		this.skinParts = ["fireGroup","manGroup","clock","productGroup"];
		
		this.height = 250;
		this.width = 240;
		this.elementsContent = [this.fireGroup_i(),this.manGroup_i(),this.clock_i(),this.productGroup_i()];
	}
	var _proto = WorkDeskSkin.prototype;

	_proto.fireGroup_i = function () {
		var t = new eui.Group();
		this.fireGroup = t;
		t.height = 160;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.width = 240;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.manGroup_i = function () {
		var t = new eui.Group();
		this.manGroup = t;
		t.height = 160;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.width = 240;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.clock_i = function () {
		var t = new eui.Image();
		this.clock = t;
		t.source = "game_work_clock_png";
		t.x = 106;
		t.y = 177.5;
		return t;
	};
	_proto.productGroup_i = function () {
		var t = new eui.Group();
		this.productGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 10;
		t.touchEnabled = false;
		t.width = 34;
		t.x = 187;
		t.y = 142;
		return t;
	};
	return WorkDeskSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/scene/game/workdesk/LevelUpItemSkin.exml'] = window.LevelUpItemSkin = (function (_super) {
	__extends(LevelUpItemSkin, _super);
	function LevelUpItemSkin() {
		_super.call(this);
		this.skinParts = ["bar","barMask","starLab","levelLab","goldLab","levelUpGroup","cosLab","unlockGroup"];
		
		this.height = 240;
		this.width = 240;
		this.elementsContent = [this.levelUpGroup_i(),this.unlockGroup_i()];
	}
	var _proto = LevelUpItemSkin.prototype;

	_proto.levelUpGroup_i = function () {
		var t = new eui.Group();
		this.levelUpGroup = t;
		t.height = 140;
		t.width = 120;
		t.x = 60;
		t.y = 50;
		t.elementsContent = [this._Image1_i(),this.bar_i(),this.barMask_i(),this._Image2_i(),this._Group1_i(),this._Group2_i(),this._Group3_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "game_levelup_item_png";
		t.x = 7;
		t.y = 5;
		return t;
	};
	_proto.bar_i = function () {
		var t = new eui.Image();
		this.bar = t;
		t.anchorOffsetY = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "game_levelup_bar_png";
		t.x = 26;
		t.y = 22.5;
		return t;
	};
	_proto.barMask_i = function () {
		var t = new eui.Rect();
		this.barMask = t;
		t.height = 54;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 68;
		t.x = 26;
		t.y = 22.5;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "game_levelup_green_png";
		t.x = 7.5;
		t.y = 5.37;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 27.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 29;
		t.x = 8.5;
		t.y = 7.25;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.starLab_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto.starLab_i = function () {
		var t = new eui.BitmapLabel();
		this.starLab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "level_font_fnt";
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "9";
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 57;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 72;
		t.x = 24;
		t.y = 23.5;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this.levelLab_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto.levelLab_i = function () {
		var t = new eui.BitmapLabel();
		this.levelLab = t;
		t.font = "money_font_fnt";
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "99";
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 24.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 49;
		t.x = 52;
		t.y = 91;
		t.layout = this._HorizontalLayout3_i();
		t.elementsContent = [this.goldLab_i()];
		return t;
	};
	_proto._HorizontalLayout3_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "left";
		t.verticalAlign = "middle";
		return t;
	};
	_proto.goldLab_i = function () {
		var t = new eui.BitmapLabel();
		this.goldLab = t;
		t.font = "money_font_fnt";
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "99";
		return t;
	};
	_proto.unlockGroup_i = function () {
		var t = new eui.Group();
		this.unlockGroup = t;
		t.height = 140;
		t.width = 120;
		t.x = 60;
		t.y = 50;
		t.elementsContent = [this._Image3_i(),this._Image4_i(),this._Image5_i(),this.cosLab_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "game_unlock_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "game_unlock_txt_png";
		t.x = 20;
		t.y = 70;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.source = "com_gold_small_png";
		t.x = 17;
		t.y = 38;
		return t;
	};
	_proto.cosLab_i = function () {
		var t = new eui.BitmapLabel();
		this.cosLab = t;
		t.font = "write_font_fnt";
		t.text = "9";
		t.x = 49;
		t.y = 41;
		return t;
	};
	return LevelUpItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/scene/game/workdesk/WorkAreaUISkin.exml'] = window.WorkAreaUISkin = (function (_super) {
	__extends(WorkAreaUISkin, _super);
	function WorkAreaUISkin() {
		_super.call(this);
		this.skinParts = ["deskGroup","rect","levelUpGroup"];
		
		this.height = 720;
		this.width = 720;
		this.elementsContent = [this.deskGroup_i(),this.rect_i(),this.levelUpGroup_i()];
	}
	var _proto = WorkAreaUISkin.prototype;

	_proto.deskGroup_i = function () {
		var t = new eui.Group();
		this.deskGroup = t;
		t.height = 720;
		t.touchEnabled = false;
		t.width = 720;
		t.x = 0;
		t.y = 0;
		t.layout = this._TileLayout1_i();
		t.elementsContent = [this._WorkDesk1_i(),this._WorkDesk2_i(),this._WorkDesk3_i(),this._WorkDesk4_i(),this._WorkDesk5_i(),this._WorkDesk6_i(),this._WorkDesk7_i(),this._WorkDesk8_i(),this._WorkDesk9_i()];
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.columnAlign = "left";
		t.horizontalAlign = "left";
		t.horizontalGap = 0;
		t.orientation = "rows";
		t.rowAlign = "top";
		t.verticalAlign = "top";
		t.verticalGap = -30;
		return t;
	};
	_proto._WorkDesk1_i = function () {
		var t = new WorkDesk();
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "WorkDeskSkin";
		t.x = 0;
		t.y = 78;
		return t;
	};
	_proto._WorkDesk2_i = function () {
		var t = new WorkDesk();
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "WorkDeskSkin";
		t.x = 240;
		t.y = 78;
		return t;
	};
	_proto._WorkDesk3_i = function () {
		var t = new WorkDesk();
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "WorkDeskSkin";
		t.x = 480;
		t.y = 78;
		return t;
	};
	_proto._WorkDesk4_i = function () {
		var t = new WorkDesk();
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "WorkDeskSkin";
		t.x = 0;
		t.y = 278;
		return t;
	};
	_proto._WorkDesk5_i = function () {
		var t = new WorkDesk();
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "WorkDeskSkin";
		t.x = 240;
		t.y = 278;
		return t;
	};
	_proto._WorkDesk6_i = function () {
		var t = new WorkDesk();
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "WorkDeskSkin";
		t.x = 480;
		t.y = 278;
		return t;
	};
	_proto._WorkDesk7_i = function () {
		var t = new WorkDesk();
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "WorkDeskSkin";
		t.x = 0;
		t.y = 478;
		return t;
	};
	_proto._WorkDesk8_i = function () {
		var t = new WorkDesk();
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "WorkDeskSkin";
		t.x = 240;
		t.y = 478;
		return t;
	};
	_proto._WorkDesk9_i = function () {
		var t = new WorkDesk();
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "WorkDeskSkin";
		t.x = 480;
		t.y = 478;
		return t;
	};
	_proto.rect_i = function () {
		var t = new eui.Rect();
		this.rect = t;
		t.fillAlpha = 0.8;
		t.height = 540;
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.levelUpGroup_i = function () {
		var t = new eui.Group();
		this.levelUpGroup = t;
		t.height = 720;
		t.touchEnabled = false;
		t.width = 720;
		t.x = 0;
		t.y = 0;
		t.layout = this._TileLayout2_i();
		t.elementsContent = [this._LevelUpItem1_i(),this._LevelUpItem2_i(),this._LevelUpItem3_i(),this._LevelUpItem4_i(),this._LevelUpItem5_i(),this._LevelUpItem6_i(),this._LevelUpItem7_i(),this._LevelUpItem8_i(),this._LevelUpItem9_i()];
		return t;
	};
	_proto._TileLayout2_i = function () {
		var t = new eui.TileLayout();
		t.columnAlign = "left";
		t.horizontalAlign = "left";
		t.horizontalGap = 0;
		t.orientation = "rows";
		t.paddingLeft = 0;
		t.paddingTop = 0;
		t.rowAlign = "top";
		t.verticalAlign = "top";
		t.verticalGap = -30;
		return t;
	};
	_proto._LevelUpItem1_i = function () {
		var t = new LevelUpItem();
		t.skinName = "LevelUpItemSkin";
		t.x = 62;
		t.y = 180;
		return t;
	};
	_proto._LevelUpItem2_i = function () {
		var t = new LevelUpItem();
		t.skinName = "LevelUpItemSkin";
		t.x = 72;
		t.y = 190;
		return t;
	};
	_proto._LevelUpItem3_i = function () {
		var t = new LevelUpItem();
		t.skinName = "LevelUpItemSkin";
		t.x = 82;
		t.y = 200;
		return t;
	};
	_proto._LevelUpItem4_i = function () {
		var t = new LevelUpItem();
		t.skinName = "LevelUpItemSkin";
		t.x = 92;
		t.y = 210;
		return t;
	};
	_proto._LevelUpItem5_i = function () {
		var t = new LevelUpItem();
		t.skinName = "LevelUpItemSkin";
		t.x = 102;
		t.y = 220;
		return t;
	};
	_proto._LevelUpItem6_i = function () {
		var t = new LevelUpItem();
		t.skinName = "LevelUpItemSkin";
		t.x = 112;
		t.y = 230;
		return t;
	};
	_proto._LevelUpItem7_i = function () {
		var t = new LevelUpItem();
		t.skinName = "LevelUpItemSkin";
		t.x = 122;
		t.y = 240;
		return t;
	};
	_proto._LevelUpItem8_i = function () {
		var t = new LevelUpItem();
		t.skinName = "LevelUpItemSkin";
		t.x = 132;
		t.y = 250;
		return t;
	};
	_proto._LevelUpItem9_i = function () {
		var t = new LevelUpItem();
		t.skinName = "LevelUpItemSkin";
		t.x = 142;
		t.y = 260;
		return t;
	};
	return WorkAreaUISkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/scene/game/menu/FootMenuUISkin.exml'] = window.FootMenuUISkin = (function (_super) {
	__extends(FootMenuUISkin, _super);
	var FootMenuUISkin$Skin1 = 	(function (_super) {
		__extends(FootMenuUISkin$Skin1, _super);
		function FootMenuUISkin$Skin1() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","footmenu_task1_png"),
						new eui.SetProperty("_Image1","verticalCenter",5)
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FootMenuUISkin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "footmenu_task0_png";
			t.verticalCenter = 0;
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return FootMenuUISkin$Skin1;
	})(eui.Skin);

	var FootMenuUISkin$Skin2 = 	(function (_super) {
		__extends(FootMenuUISkin$Skin2, _super);
		function FootMenuUISkin$Skin2() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","footmenu_pic1_png"),
						new eui.SetProperty("_Image1","verticalCenter",5)
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FootMenuUISkin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "footmenu_pic0_png";
			t.verticalCenter = 0;
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return FootMenuUISkin$Skin2;
	})(eui.Skin);

	var FootMenuUISkin$Skin3 = 	(function (_super) {
		__extends(FootMenuUISkin$Skin3, _super);
		function FootMenuUISkin$Skin3() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","footmenu_level1_png"),
						new eui.SetProperty("_Image1","verticalCenter",5)
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FootMenuUISkin$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "footmenu_level0_png";
			t.verticalCenter = 0;
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return FootMenuUISkin$Skin3;
	})(eui.Skin);

	var FootMenuUISkin$Skin4 = 	(function (_super) {
		__extends(FootMenuUISkin$Skin4, _super);
		function FootMenuUISkin$Skin4() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","footmenu_col2_png"),
						new eui.SetProperty("_Image2","source","footmenu_col1_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FootMenuUISkin$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			this._Image2 = t;
			t.percentHeight = 100;
			t.source = "footmenu_col0_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return FootMenuUISkin$Skin4;
	})(eui.Skin);

	function FootMenuUISkin() {
		_super.call(this);
		this.skinParts = ["taskBtn","picBtn","levelUpBtn","colBtn","goldLab","taskLab","taskGroup"];
		
		this.height = 160;
		this.width = 720;
		this.elementsContent = [this.taskBtn_i(),this.picBtn_i(),this.levelUpBtn_i(),this._Group1_i(),this._Image1_i(),this.goldLab_i(),this.taskGroup_i()];
	}
	var _proto = FootMenuUISkin.prototype;

	_proto.taskBtn_i = function () {
		var t = new eui.Button();
		this.taskBtn = t;
		t.label = "";
		t.x = 2;
		t.y = 26;
		t.skinName = FootMenuUISkin$Skin1;
		return t;
	};
	_proto.picBtn_i = function () {
		var t = new eui.Button();
		this.picBtn = t;
		t.label = "";
		t.x = 152;
		t.y = 26;
		t.skinName = FootMenuUISkin$Skin2;
		return t;
	};
	_proto.levelUpBtn_i = function () {
		var t = new eui.Button();
		this.levelUpBtn = t;
		t.label = "";
		t.x = 302.5;
		t.y = 26;
		t.skinName = FootMenuUISkin$Skin3;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 131;
		t.touchEnabled = false;
		t.width = 253;
		t.x = 459;
		t.y = 28;
		t.elementsContent = [this.colBtn_i()];
		return t;
	};
	_proto.colBtn_i = function () {
		var t = new eui.Button();
		this.colBtn = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 0;
		t.skinName = FootMenuUISkin$Skin4;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "com_gold2_png";
		t.touchEnabled = false;
		t.x = 478;
		t.y = 71;
		return t;
	};
	_proto.goldLab_i = function () {
		var t = new eui.BitmapLabel();
		this.goldLab = t;
		t.font = "footmenu_gold_font_fnt";
		t.text = "999.99K";
		t.touchEnabled = false;
		t.x = 514;
		t.y = 69;
		return t;
	};
	_proto.taskGroup_i = function () {
		var t = new eui.Group();
		this.taskGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 52;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.width = 54;
		t.x = 98;
		t.y = -2;
		t.elementsContent = [this._Image2_i(),this.taskLab_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "footmenu_task_png";
		return t;
	};
	_proto.taskLab_i = function () {
		var t = new eui.BitmapLabel();
		this.taskLab = t;
		t.font = "task_font_fnt";
		t.horizontalCenter = 1.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "2";
		t.verticalCenter = -1.5;
		return t;
	};
	return FootMenuUISkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/scene/game/GameSceneSkin.exml'] = window.GameSceneSkin = (function (_super) {
	__extends(GameSceneSkin, _super);
	function GameSceneSkin() {
		_super.call(this);
		this.skinParts = ["bg","factoryBoneGroup","topMenuUI","meterUI","workAreaUI","topGroup","footMenuUI"];
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.bg_i(),this.topGroup_i(),this.footMenuUI_i()];
	}
	var _proto = GameSceneSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.source = "S0001_jpg";
		t.x = 0;
		t.y = -36;
		return t;
	};
	_proto.topGroup_i = function () {
		var t = new eui.Group();
		this.topGroup = t;
		t.height = 1280;
		t.touchEnabled = false;
		t.width = 720;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.factoryBoneGroup_i(),this.topMenuUI_i(),this.meterUI_i(),this.workAreaUI_i()];
		return t;
	};
	_proto.factoryBoneGroup_i = function () {
		var t = new eui.Group();
		this.factoryBoneGroup = t;
		t.height = 1280;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.topMenuUI_i = function () {
		var t = new TopMenuUI();
		this.topMenuUI = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "TopMenuUISkin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.meterUI_i = function () {
		var t = new EffectMeterUI();
		this.meterUI = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EffectMeterUISkin";
		t.x = -3;
		t.y = 149;
		return t;
	};
	_proto.workAreaUI_i = function () {
		var t = new WorkAreaUI();
		this.workAreaUI = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "WorkAreaUISkin";
		t.x = 0;
		t.y = 438;
		return t;
	};
	_proto.footMenuUI_i = function () {
		var t = new FootMenuUI();
		this.footMenuUI = t;
		t.bottom = 0;
		t.skinName = "FootMenuUISkin";
		t.x = 0;
		return t;
	};
	return GameSceneSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/scene/load/LoadSceneSkin.exml'] = window.LoadSceneSkin = (function (_super) {
	__extends(LoadSceneSkin, _super);
	function LoadSceneSkin() {
		_super.call(this);
		this.skinParts = ["progressLab"];
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Rect1_i(),this.progressLab_i()];
	}
	var _proto = LoadSceneSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.bottom = 0;
		t.fillColor = 0x285fcc;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.progressLab_i = function () {
		var t = new eui.Label();
		this.progressLab = t;
		t.horizontalCenter = 0;
		t.text = "Label";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	return LoadSceneSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/scene/home/HomeSceneSkin.exml'] = window.HomeSceneSkin = (function (_super) {
	__extends(HomeSceneSkin, _super);
	var HomeSceneSkin$Skin5 = 	(function (_super) {
		__extends(HomeSceneSkin$Skin5, _super);
		function HomeSceneSkin$Skin5() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HomeSceneSkin$Skin5.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "com_btn_red_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return HomeSceneSkin$Skin5;
	})(eui.Skin);

	var HomeSceneSkin$Skin6 = 	(function (_super) {
		__extends(HomeSceneSkin$Skin6, _super);
		function HomeSceneSkin$Skin6() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HomeSceneSkin$Skin6.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "com_btn_red_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return HomeSceneSkin$Skin6;
	})(eui.Skin);

	function HomeSceneSkin() {
		_super.call(this);
		this.skinParts = ["startBtn","resetBtn"];
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Rect1_i(),this._Group1_i()];
	}
	var _proto = HomeSceneSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.bottom = 0;
		t.fillColor = 0x285FCC;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.touchEnabled = false;
		t.elementsContent = [this.startBtn_i(),this.resetBtn_i()];
		return t;
	};
	_proto.startBtn_i = function () {
		var t = new eui.Button();
		this.startBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.label = "进入游戏";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 240;
		t.y = 613;
		t.skinName = HomeSceneSkin$Skin5;
		return t;
	};
	_proto.resetBtn_i = function () {
		var t = new eui.Button();
		this.resetBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.label = "重置数据";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 240;
		t.y = 713;
		t.skinName = HomeSceneSkin$Skin6;
		return t;
	};
	return HomeSceneSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/scene/game/collectionArea/CollectionTextSkin.exml'] = window.CollectionTextSkin = (function (_super) {
	__extends(CollectionTextSkin, _super);
	function CollectionTextSkin() {
		_super.call(this);
		this.skinParts = ["numLab"];
		
		this.height = 30;
		this.width = 100;
		this.elementsContent = [this._Image1_i(),this.numLab_i()];
	}
	var _proto = CollectionTextSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "com_gold_png";
		t.x = 0;
		t.y = 2;
		return t;
	};
	_proto.numLab_i = function () {
		var t = new eui.Label();
		this.numLab = t;
		t.size = 24;
		t.text = "Label";
		t.textColor = 0xfdcb02;
		t.verticalCenter = 0;
		t.x = 37;
		return t;
	};
	return CollectionTextSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/scene/game/workdesk/EmptyDeskSkin.exml'] = window.EmptyDeskSkin = (function (_super) {
	__extends(EmptyDeskSkin, _super);
	function EmptyDeskSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 250;
		this.width = 240;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = EmptyDeskSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "game_emptydesk_png";
		t.x = 18;
		t.y = 136;
		return t;
	};
	return EmptyDeskSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/scene/game/workdesk/GainTextSkin.exml'] = window.GainTextSkin = (function (_super) {
	__extends(GainTextSkin, _super);
	function GainTextSkin() {
		_super.call(this);
		this.skinParts = ["numLab"];
		
		this.height = 22;
		this.width = 200;
		this.elementsContent = [this.numLab_i()];
	}
	var _proto = GainTextSkin.prototype;

	_proto.numLab_i = function () {
		var t = new eui.BitmapLabel();
		this.numLab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "gain_font_fnt";
		t.text = "+99999";
		t.x = 0;
		t.y = 0;
		return t;
	};
	return GainTextSkin;
})(eui.Skin);