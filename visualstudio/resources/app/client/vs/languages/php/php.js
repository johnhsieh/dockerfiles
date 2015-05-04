/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
"use strict";var __extends=this.__extends||function(e,r){function n(){this.constructor=e}for(var s in r)r.hasOwnProperty(s)&&(e[s]=r[s]);n.prototype=r.prototype,e.prototype=new n};define("vs/languages/php/php",["require","exports","vs/editor/modes/autoIndentation/autoIndentation","vs/base/objects","vs/editor/modes/modes","vs/editor/modes/modesExtensions","vs/editor/modes/supports","vs/platform/platform","vs/platform/services","vs/platform/thread/attribute"],function(e,r,n,s,o,t,a,i,l,c){var d=[{tokenType:"delimiter.bracket.php",open:"{",close:"}",isElectric:!0},{tokenType:"delimiter.array.php",open:"[",close:"]",isElectric:!0},{tokenType:"delimiter.parenthesis.php",open:"(",close:")",isElectric:!0}],u=new n.Brackets(d),m="+-*%&|^~!=<>(){}[]/?;:.,@",h="+-*/%&|^~!=<>(){}[]\"'\\/?;:.,#",p="	 ",b=s.createKeywordMatcher(["abstract","and","array","as","break","callable","case","catch","cfunction","class","clone","const","continue","declare","default","do","else","elseif","enddeclare","endfor","endforeach","endif","endswitch","endwhile","extends","false","final","for","foreach","function","global","goto","if","implements","interface","instanceof","insteadof","namespace","new","null","object","old_function","or","private","protected","public","resource","static","switch","throw","trait","try","true","use","var","while","xor","die","echo","empty","exit","eval","include","include_once","isset","list","require","require_once","return","print","unset","__construct"]),v=s.createKeywordMatcher(["__CLASS__","__DIR__","__FILE__","__LINE__","__NAMESPACE__","__METHOD__","__FUNCTION__","__TRAIT__"]),w=s.createKeywordMatcher(["$GLOBALS","$_SERVER","$_GET","$_POST","$_FILES","$_REQUEST","$_SESSION","$_ENV","$_COOKIE","$php_errormsg","$HTTP_RAW_POST_DATA","$http_response_header","$argc","$argv"]),f=function(e){return m.indexOf(e)>-1},g=function(e){return"$"===e[0]},y=function(e){function r(r,n,s,o){void 0===o&&(o=""),e.call(this,r),this.name=n,this.parent=s,this.whitespaceTokenType=o}return __extends(r,e),r.prototype.equals=function(n){return n instanceof r?e.prototype.equals.call(this,n)&&this.name===n.name&&this.whitespaceTokenType===n.whitespaceTokenType&&t.safeStateEquals(this.parent,n.parent):!1},r.prototype.tokenize=function(e){return e.setTokenRules(h,p),e.skipWhitespace().length>0?{type:this.whitespaceTokenType}:this.stateTokenize(e)},r.prototype.stateTokenize=function(){throw new Error("To be implemented")},r}(t.AbstractState);r.PHPState=y;var k=function(e){function r(r,n,s,o){void 0===o&&(o=!0),e.call(this,r,"string",n,"string.php"),this.delimiter=s,this.isAtBeginning=o}return __extends(r,e),r.prototype.makeClone=function(){return new r(this.getMode(),t.safeStateClone(this.parent),this.delimiter,this.isAtBeginning)},r.prototype.equals=function(n){return n instanceof r?e.prototype.equals.call(this,n)&&this.delimiter===n.delimiter&&this.isAtBeginning===n.isAtBeginning:!1},r.prototype.tokenize=function(e){var r=this.isAtBeginning?1:0;for(this.isAtBeginning=!1;!e.eos();){var n=e.next();if("\\"===n){if(0!==r)return e.goBack(1),{type:"string.php"};if(e.eos())return{type:"string.php",nextState:this.parent};e.next()}else if(n===this.delimiter)return{type:"string.php",nextState:this.parent};r+=1}return{type:"string.php"}},r}(y);r.PHPString=k;var x=function(e){function r(r,n,s){e.call(this,r,"number",n),this.firstDigit=s}return __extends(r,e),r.prototype.makeClone=function(){return new r(this.getMode(),t.safeStateClone(this.parent),this.firstDigit)},r.prototype.equals=function(n){return n instanceof r?e.prototype.equals.call(this,n)&&this.firstDigit===n.firstDigit:!1},r.prototype.tokenize=function(e){var r=this.firstDigit,n=10,s=!1,o=!1;if("0"===r&&!e.eos()){if(r=e.peek(),"x"===r.toLowerCase())n=16;else if("b"===r.toLowerCase())n=2;else if("."===r)n=10;else{if(!t.isDigit(r,8))return{type:"number.php",nextState:this.parent};n=8}e.next()}for(;!e.eos();)if(r=e.peek(),t.isDigit(r,n))e.next();else if(10===n)if("."!==r||o||s){if("e"!==r||o)break;o=!0,e.next(),e.eos()||"-"!==e.peek()||e.next()}else s=!0,e.next();else{if(8!==n||!t.isDigit(r,10))break;n=10,e.next()}var a="number";return 16===n?a+=".hex":8===n?a+=".octal":2===n&&(a+=".binary"),{type:a+".php",nextState:this.parent}},r}(y);r.PHPNumber=x;var T=function(e){function r(r,n){e.call(this,r,"comment",n,"comment.php")}return __extends(r,e),r.prototype.makeClone=function(){return new _(this.getMode(),t.safeStateClone(this.parent))},r.prototype.equals=function(n){return n instanceof r?e.prototype.equals.call(this,n):!1},r.prototype.tokenize=function(e){for(;!e.eos();){var r=e.next();if("?"===r&&!e.eos()&&">"===e.peek())return e.goBack(1),{type:"comment.php",nextState:this.parent}}return{type:"comment.php",nextState:this.parent}},r}(y);r.PHPLineComment=T;var _=function(e){function r(r,n){e.call(this,r,"comment",n,"comment.php")}return __extends(r,e),r.prototype.makeClone=function(){return new r(this.getMode(),t.safeStateClone(this.parent))},r.prototype.equals=function(n){return n instanceof r?e.prototype.equals.call(this,n):!1},r.prototype.tokenize=function(e){for(;!e.eos();){var r=e.next();if("*"===r&&!e.eos()&&!e.peekWhitespace()&&"/"===e.peek())return e.next(),{type:"comment.php",nextState:this.parent}}return{type:"comment.php"}},r}(y);r.PHPDocComment=_;var S=function(e){function r(r,n){e.call(this,r,"expression",n)}return __extends(r,e),r.prototype.makeClone=function(){return new r(this.getMode(),t.safeStateClone(this.parent))},r.prototype.equals=function(n){return n instanceof r?e.prototype.equals.call(this,n):!1},r.prototype.stateTokenize=function(e){if(t.isDigit(e.peek(),10))return{nextState:new x(this.getMode(),this,e.next())};if(e.advanceIfString("?>").length)return{type:"metatag.php",nextState:this.parent,bracket:o.Bracket.Close};var r=e.nextToken();if(b(r.toString().toLowerCase()))return{type:"keyword.php"};if(v(r))return{type:"constant.php"};if(w(r))return{type:"variable.predefined.php"};if(g(r))return{type:"variable.php"};if("/"===r){if(!e.eos()&&!e.peekWhitespace())switch(e.peekToken()){case"/":return{nextState:new T(this.getMode(),this)};case"*":return e.nextToken(),{nextState:new _(this.getMode(),this)}}}else{if("#"===r)return{nextState:new T(this.getMode(),this)};if('"'===r||"'"===r)return{nextState:new k(this.getMode(),this,r)};if(u.stringIsBracket(r))return{bracket:u.bracketTypeFromString(r),type:u.tokenTypeFromString(r)};if(f(r))return{type:"delimiter.php"}}return{type:""}},r}(y);r.PHPStatement=S;var C=function(e){function r(r,n){e.call(this,r,"plain",n)}return __extends(r,e),r.prototype.makeClone=function(){return new r(this.getMode(),t.safeStateClone(this.parent))},r.prototype.equals=function(n){return n instanceof r?e.prototype.equals.call(this,n):!1},r.prototype.stateTokenize=function(e){return e.advanceIfStringCaseInsensitive("<?php").length||e.advanceIfString("<?=").length||e.advanceIfString("<%=").length||e.advanceIfString("<?").length||e.advanceIfString("<%").length?{type:"metatag.php",nextState:new S(this.getMode(),new E(this.getMode(),this.parent)),bracket:o.Bracket.Open}:(e.next(),{type:""})},r}(y);r.PHPPlain=C;var E=function(e){function r(r,n){e.call(this,r,"enterHTML",n)}return __extends(r,e),r.prototype.makeClone=function(){return new r(this.getMode(),t.safeStateClone(this.parent))},r.prototype.equals=function(n){return n instanceof r?e.prototype.equals.call(this,n):!1},r}(y);r.PHPEnterHTMLState=E;var I=function(e){function r(r,n){var s=this;e.call(this,r,n,l.AsyncDescriptor.create("vs/languages/php/phpWorker","PHPWorker")),this.outlineSupport=this,this.parameterHintsSupport=new a.ParameterHintsSupport(this,{triggerCharacters:["(",","],excludeTokens:null,getParameterHints:function(e,r){return s.getParameterHints(e,r)}}),this.extraInfoSupport=this,this.electricCharacterSupport=new a.BracketElectricCharacterSupport(this,{brackets:d}),this.tokenizationSupport=new a.TokenizationSupport(this,!0),this.tokenizationSupport.shouldGenerateEmbeddedModels=!1,this.characterPairSupport=new a.CharacterPairSupport(this,{autoClosingPairs:[{open:"{",close:"}",notIn:["string.php"]},{open:"[",close:"]",notIn:["string.php"]},{open:"(",close:")",notIn:["string.php"]},{open:'"',close:'"',notIn:["string.php"]},{open:"'",close:"'",notIn:["string.php"]}]})}return __extends(r,e),r.prototype.asyncCtor=function(){return D.getOrCreateMode("text/html")},r.prototype._worker=function(r){return e.prototype._worker.call(this,r)},r.prototype.getOutline=function(e){return this._worker(function(r){return r.getOutline(e)})},r.prototype.getParameterHints=function(e,r){return this._worker(function(n){return n.getParameterHints(e,r)})},r.prototype.computeInfo=function(e,r){return this._worker(function(n){return n.computeInfo(e,r)})},r.prototype.getInitialState=function(){var e=D.getMode("text/html"),r=e.tokenizationSupport.getInitialState();return r.setStateData(new E(this,null)),r},r.prototype.enterNestedMode=function(e){return e instanceof E},r.prototype.getNestedModeInitialState=function(e){var r=e.parent;return e.parent=null,{state:r,missingModePromise:null}},r.prototype.getLeavingNestedModeData=function(e){var r=/<\?/i.exec(e);return null!==r?{nestedModeBuffer:e.substring(0,r.index),bufferAfterNestedMode:e.substring(r.index),stateAfterNestedMode:new C(this,null)}:null},r.prototype.onReturningFromNestedMode=function(e,r){e.parent=r},r.prototype.getNonWordTokenTypes=function(){return["delimiter.php","delimiter.parenthesis.php","delimiter.bracket.php","delimiter.array.php","regexp.php"]},r.prototype.getCommentsConfiguration=function(){return{lineCommentTokens:["//","#"],blockCommentStartToken:"/*",blockCommentEndToken:"*/"}},r.prototype.getWordDefinition=function(){return r.WORD_DEFINITION},r.$getOutline=c.OneWorker(r,r.prototype.getOutline),r.$getParameterHints=c.OneWorker(r,r.prototype.getParameterHints),r.$computeInfo=c.OneWorker(r,r.prototype.computeInfo),r.WORD_DEFINITION=t.createWordRegExp("$-"),r}(t.AbstractMode);r.PHPMode=I;var D=i.Registry.as(t.Extensions.EditorModes)});