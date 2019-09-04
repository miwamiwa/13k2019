
/*
images converted to strings go here, as well as the game's color palette.

the first step in the conversion is to group pixels of the same color value together.
thus the image is converted to an array of paired values: the color of a pixel, and
the number of same-color pixels that follow.

this array is then converted into a string using char codes. Char codes 33 to 126
return readable characters, which means we can actually convert these base 10 numbers
to base 93 if we want. In this code I start at char code 40 which means I can work
with base 86 numbers ( I went ahead converting images before looking into what the
maximum base i could use really was, so I arbitrarily decided to start at char code 40 ).

********* example:

let's consider that my image has 3 red pixels, then 4 blue pixels.
that .png file would require 163 bytes of space, zipped or not.

>>>> first declare colours

  colors = [red,blue]

  >>>> then group together pixels of same color:

 pixels = [
  {c:0,n:2}, // this is a pixel of color 0 followed by 2 more of the same color
  {c:1,n:3}, // this is a pixel of color 1 followed by 3 more of the same color
];

>>>> group the pairs of numbers together:

pixels = [ 02,13 ]


>>>> convert to charcodes that are readable (as discussed, i simply add 40. see above.):

pixels = [42, 53]

>>>>> convert each value to a character, then add up in a string:

pixels = "*5"

******** done!
the string above and the two color values it uses
are all that i need to include in the code.

So in a nutshell, the compression ratio i can achieve here is due to bunching
similar colors together, then halfing the number of characters and in the process
removing all the commas from the array.

The drawback of this system is obviously the limited choice of colors.
the graphic style has to follow suit. but other than that,
i compressed my .png files and also converted them into a format that
will lose even more disk space when zipped. woo!


other challenges faced:
- There is one character which breaks everything: it's char no. 92, the backslash \.
I've been editing my images so that it doesn't appear :D
- i wrote a separate code to pack images into strings, but the code hardly worked
to pack batches of images. after some attempts to fix it, i dropped the idea
in the interest of time and converted images one after the other instead. Not a
very big deal since this didn't add much to the time spent creating individual images,
but this could have allowed me to easily reconvert images using
the maximum number of colors that this process allows for example.

*/
let c = [
  "#000000",//0
  "#ffd738",
  "#d1ff3a",
  "#327fa8", // dark blue
  "#6d92a6", // pale blue
  "#c37dc9", // 5: violet

 // sky
  "#c3f7f7", // 6: pale grey blue
  "#9397bd", // darker grey blue
  "#c3dbf7", // powder blue
  "#dbc3f7", // light purple
  "#fffb80", // pale yellow

  // bird
  "#1F29C1", // 11: deep blue
  "#FF6638", // 12 beak orange
  "#EAFF30", // 13 wing yellow
  "#FFFFFF", // 14 white
      //"#f7d92a" //20

  // orangutan
  "#EA1F1C", //15: red
  "#8E423A", // dark brown
  "#FF6232", //orange
  "#8E7F7D", // grey
  "#D36A55", // light brown

  // bird orange 2:
  "#f7d92a", //20

  // tiger
  "#FFAB3D", //21 light orange
  "#FF923F", //22  dark orange
  "#303030", //23 stripe grey
  // red: 15. white: 14. black: 0.

  // home img
  "#03a822", // dark green 24
  "#9aed66"

];



let walkLoop = [
  {
    s:"11111111121/6<G1)3)3BF03=2<2DF/PE@G-SGE=G,PZQG=FE=+FRGdGBF>F*SHdG2?H?F)RIeF2@G@F*IfF2@FB-gF2?FC+FhF2?FC*FhH2>FC)Fh(H2=F@F<F)GeG+F2=Fe@F)H.F2=Fe?F*G.eF2=FA*H-f2=F)>F+G-e(F2=*I1H)I*H1H*H+G)",
    c:[false,c[15],c[17],c[16],c[18],c[0],c[19]]
  },
  {
    s:"11111111.311(3=2G1.2BF1)5DG.P4E?F,ZRGE?F+PdQGnDF?F*FRGnFAH?F)SHnG@G@F)RHpF2?FBF*JoF2?GAF-FoG2@FAF-pG2@FB,FoF(G2?Fo?F,FoF)F2>Go?F,Fo*F2>FoF>F,Fo+F2=FoG>F,Fo,F2<oF(F=F,Gn-F2<oF(F=F,H-HnF)=F-H,InF)G1,HnF)H,",
    c:[false,c[15],c[17],c[16],c[18],c[0],c[19]]
  },
  {
    s:"11111111111(61/3@F1+4CG0P3E>G-RGE?,PZQGE?F+FRGdE>F*SHdE?F)RHe2BF@F+HeF2AG@F-FeF2@GBF,FeF2?GeAF,f2?GfF@F+FeF2>GfG?F,FeF2>GfF?F-fF2=)f(F>F-FeG=*FeF?-HdF2=*FeF>.G)F=F*GdG<0G(I+J1)H,Id.",
    c:[false,c[15],c[17],c[16],c[18],c[0],c[19]]
  },
  {
    s:"11111111.4113>2F1.2BF1)3(2DG/3=2E=F-PEFBF+SFEAF*PZQGCFAF*FRGCFAG(SJBFAF(RKAFe@F*I(G@Ff@F/F@FfAF.F@GeAG-F?K@G-F?G)G@G-G>Fd*F@dF.F=Ge)F>Hd.G<F(f)F<HeF.H)Fe(I(FeG.G)H(H*I1)H1+",
    c:[false,c[15],c[17],c[16],c[18],c[0],c[19]]
  },

  {
    s:"11111111111(7<1-3L=1*2OF<.3F(2OH<,PON+S=H<OF<*PZQ>F<2OF<*<Q?d<2OG)S@2OH<(RA2L<J<*?d<2K=K<.=2I=L=.<2I=d<L<-<2H>d=L<,<2H=(f=J<*>3F=e)e<I=*=H?d+d<I,=F=*=+d<G<1+>+=F<1+>*>d=1/>)=,",
    c:[false,c[15],c[16],c[17],c[18],c[0],c[19]]
  },
  {
    s:"11111111-5103?21.2B3F1*3EF/4GE>-PECF+SG=FE<F+PZQG=F2E<F*FQH<F2E=F)SJ2E=G(RH(F2AFBF*H(G2@HAF-G2@GCF-F2>F<FgF@F,G2=IgAF,F2<I(g(AF,F2I)f)@F,Jd*eF)?F,If*Fe)?-HdG+Fe*>-G(G+Ge*F=F,G(G+H,H*",
    c:[false,c[15],c[17],c[16],c[18],c[0],c[19]]
  },
  {
    s:"11111111111*2>103I<1)3*2L<03G2(2O.PJ2OF<,S=M<J<+PZQ=G<J=J<*<QA2J<J=(SA2J<J=(RA2K=J<)@)<2K<K<*>)=2J<L<.=2I<F<L<-<d<2I=dK<-f<2H<fJ<-<f<2G<g<I<,<f<2F=f(>I<*=e(<2=f+=I*>)?e-=I)>)=(>0?(=*=(=1(>",
    c:[false,c[15],c[16],c[17],c[18],c[0],c[19]]
}
];


let jumpLoop = [
  {

    /*
    // orangutan
    "#EA1F1C", //15: red
    "#8E423A", //16 dark brown
    "#FF6232", //17 orange
    "#8E7F7D", //18 grey
    "#D36A55", //19 light brown
    */
    s:"-4112@51*F2E5F/GTCH-F<FU=G@G,F<FPZPZQ>2M+F<GPFQ@8F+F<FTE=2F*F<dSE?2F)F<eHE@2)FeF(F@FE2)FdF)e?dFDF(H*f?dI?F)H*Fe@gF=F+G*FeDF=F1eCFeF.H(FdAGeFd-FeGe@HeF.Fj@GdF<I)GjAG?dF(HeGfF<GBFdF)H*H)GA)G1,F?F)G1-I111(",
    c:[false,c[15],c[17],c[16],c[18],c[0],c[19]]
  },
  {
    s:"111(4112@41+F2D31)GT@F4F.F<FUDF-F<FPZPZQEF,F<GPFQE=F+F<FTE>F*FeS?FDF*FfH@FCF)GeG(FAI?F)I*FDH=F*G+FE<F>*F,FdE<F=0FeDF<G/GgBH/GgGAH.FiG@H.FgJ@F/GeG,F@F.FeF/F@F-FdF1G>G,H1)K,G1-G)",
    c:[false,c[15],c[17],c[16],c[18],c[0],c[19]]
  },
  {
    s:"111)4112?2,3G/F2A*3F<3F.2FT=3F@2G+F<FUE3+2<FPZPZQE<2F)G<GPFQE>F)G<FTE>F(GfSBI>F(Ff(IAK>Gd*FCG=J<F,FBG?I=,FdE>F(H,FeE=F)G,Ff>FAF0GhGAF0FfH(F@F1FeG*F?F1FgF*F?F1FgF*F?1)FfF*F>F1*FeF+H1,H+H1-G+G1",
    c:[false,c[15],c[17],c[16],c[18],c[0],c[19]]
  },
];

let sleepLoop = [
  {

    /*
    // orangutan
    "#EA1F1C", //15: red
    "#8E423A", //16 dark brown
    "#FF6232", //17 orange
    "#8E7F7D", //18 grey
    "#D36A55", //19 light brown
    */
    s:"111111111111111111.61/<2=H31,>L31*<OF21(=O40=OI2/=L<KP2-=M2F2PHP2-=H<K2PHP2,<J2PG2G2<HP2)G3F<G3<G2PF2<HP2(3[4H2<H2G2<GP2<_3H2<G2PG2PF2(<[2ZdZ3I2<G2G2<G2<_3F3G2<F2PF3FP2(F3Z4F4G3G3P2FP4SGQ2P3<PFP2S4M3PIP5P3(",
    c:[false,c[16],c[15],c[17],c[19],c[18],c[0]]
  },
  {
    s:"1111111111111111)61/<2=H31,=M31*<OF21(<OF40=OI2/=OIP2-=M<KP2,>M2GPHP2+=H2F<H2G2PHP2+<J2QG2G2IP2)G3F<G3<H2F2<HP2(3[4H2<H2F2=G2(<_3H2<H2F3PF2(<[2ZdZ3I2<G2G2<G2<_3F3G2<G2F3FP2(F3Z4F5F3G3P2FP4SGQ2Q2<PFP2S4M3PIP5P3(",
    c:[false,c[16],c[15],c[17],c[19],c[18],c[0]]
  },
  {
    s:"1111111111111.511>G31.<2K31+=N31(=OG21<OF2G2/=OI2.=OJP2,=N<KP2,<G3K2GPHP2+=H2P<J2QHP2+2J2QG4PIP2)F4F<G3<H2F2<HP2(3[4H2<H2P2=G2(<_3H2<H2F3PF2(<[2ZdZ3I2<G2PF2<G2<_3F3G2<GPF3FP2(F3Z4F8GP2P2FP2(2SGQ2R<PFP2S4M3PIP5P3(",
    c:[false,c[16],c[15],c[17],c[19],c[18],c[0]]
  },
];



let stillLoop = [
  {
    s:"11111111111)4>1(3+3H3>.3F4(M3=-QI2OF<,SOK<+PZQ=e<OF<+<Q>d=L<I<)S>e<J>I<)R?e<2J=I<+>)e<2J<J<0e<3H<dK</e<3H<dK</e=2G=eJ<.f<2G=fI=.e<4=f(J<-f<3<(g)H=,f=2<)g(<H<-=(>*<f(<H<-=(=+<f(<G=-A)?)<F=/=(=)>)@*",
    c:[false,c[15],c[16],c[17],c[18],c[0],c[19]]
  },
  {
    s:"11111111111*3=103I=13+2M<.3G4(2N<-POM<+S=OI<+PZQ=e<J<K<*<Q>fK<J<)S>e<2O=)R?f2J<I<,>)<e2J<J<0<e<2H<dJ</<f<2GgI</<e<2G<gI<.<e<2G<hJ<-f<2F<(g(I<-<e(<2F<(g)H<,=e(<2<)=e)H<,>)>*>)F=.=)?(?(?.=*>(>)>+",
    c:[false,c[15],c[16],c[17],c[18],c[0],c[19]]
  },
  {
    s:"11111111111*5=1/2J2<1,3L2</3*2O2<-2H3OH<+PON<*SOF<F<I<)PZQ=dL<F<dI<)<Q>e<L<dI<(S>f<K<dG<F<(R?g<2H<fG<+>)<f<2H<fH/<e=3G<gH.<f4G<f(dH<,<f<2H<g(dH<,<e<3F<(h)H,<f(<3*g(<H,<e<(=+<f(I<*=d*>*<e<(<G<+>+=)>d)=F<,=/?)?)",
    c:[false,c[15],c[16],c[17],c[18],c[0],c[19]]
  },
]
/*

*/
let homeImg =
  {
    s:"111111111*311(=4(31-=)61,=)3G21-<)71,=)3)41+</31+</=,?,DP<)>S=)=W=)=U?T<R<,=P>P=S>Q=-=R>Q>S</=R<P>T<1(?P<T?.?Q?P?Q=,=SBQ>P=+<Q?Q?S=P<*=Q<S=*>S<*<T>.A)C1111(",
    c:[false,c[12], c[24], c[13], c[25]]
  };


let tigerJumpLoop = [
  {
    s:"1111111111111111111111111111111111)2<211(3<5<-F*F-2=3<2<3<,2<F<3*2<4<2<5<,G<G<3<3<3<4<2<2+FPGPF2<2<:<4<(2(PZGZP2<3<2<2P<2<4<4<(K5<2<P<P2<3<2P(2)F<d<G<3<2P<R<3<2P-R(<3<Q<P)<F<4P/F3<2P2+HP<3=,F2=2<P-<F=)4P<2F<4Q/<FP+=4F<3<1G=P*4(G31)I<F,",
    c:[false,c[21],c[23],c[22],c[14],c[0],c[15]]
  },
  {
    s:"1111111111111111111111111111111-211*2=3/F*F.2<4<2<.2H2F+2<3<6<-K<3<3<3<2<2=,FPGPG=2=2<3<4<3)2(PZGZPF5<3<9=)L<5Q<2<5<(2*F<d<G<4P<Q<3=2P.R(F3<P<Q<QF<3<1<3=(Q<*=3Q.GP3P/GP=2Q<*<F<3<1=P(4<P(G4Q1G=P=3F<Q2=1)K<(G(3<1.H(",
    c:[false,c[21],c[23],c[22],c[14],c[0],c[15]]
  },
  {
    s:"1111111111111111111111111111111+2<20F*F/@2/<H<.3<3<3-L2*>2=2>-FPGPG3=2@2=2<*<(PZGZP=2>2=2?2<)2<(K?2<2=2<2<2=2=)F2d2G?2?2<2<2>2+RF=2=2<P2P=2>2/FP<3<2Q2R2=P2P.2F2<2Q)2Q2(F=2P*<+F2<Q0F2>2P2<2)FP=P1(G=2<2<)2F2<31)3@)G2=P1*H2+H3=10",
    c:[false,c[23],c[21],c[22],c[14],c[0],c[15]]
  },
];
/*
// tiger
"#FFAB3D", //21 light orange
"#FF923F", //22  dark orange
"#303030", //23 stripe grey
// red: 15. white: 14. black: 0.
*/
let tigerWalkLoop = [
  {
    s:"11111111111111111111111111111111111*2+20=F</<F2F2<.<G=F<.3F3=*<F?F<F=F+2P3P3<F<F=F<FC(F(2Z3ZP2<F?F=F<F<F<(F=(F6F=F<F?F<F<F2,2FdF2F3>F<FQF>F2P,R(3Q<F=FQFP<FP2Q.3SF<FQFQ<F(3F-3FP)F<P)FP(<FP)2P,2FP*=F-<Q)G+2Q+F<P-<G)2Q)2G,=FP,<Q(3F*3.?*>F(4)",
    c:[false,c[22],c[21],c[23],c[14],c[0],c[15]]
  },
  {
    s:"11111111111111111111111111111111-2+211(<F2F2<.<F=13F3=+<F=F=/2P3P3<F<G=F=F<F=,2Z3ZP2<F@F=F=F<F+7F=F=F>F?(=(<(2FdF2F2=F=F<F>F=2(F<*R(3<F?PF<F<F<2P13F=F<QFPF<FP3F/3FPF<FQFPFP<FP(3P-3Q(P=F(Q)F=F(G-2FP)G<.<G3F,3P*P=.=P3-3F)2F<0<F2/3)>0=,",
    c:[false,c[22],c[21],c[23],c[14],c[0],c[15]]
  },
  {
    s:"11111111111111111111111111111111111*2*2/<G<F0F<2<G+F<G<G<F/3<3F<F<H<G<F<F<F,2P3P2F<G<G<G<I<F)F(PZ3ZPI<L<G(F+7F<K<H<F<(<)F(2<d<2<F<F<F<FP<PF<F<F)F<*R(3F<G<Q<P<H213P<G<Q<)PGP2<02=(<G-F=2<03P<G/G<P02=PG/2G<12PG/3G<F0H2.3=H*",
    c:[false,c[22],c[23],c[21],c[14],c[0],c[15]]
  },
  {
    s:"1111111111111111111111111111111111*2<11*2<3<.F+F-<2<3<3<-2<G<2*2<5<3<2<2,G=G<2<3<2<2<3<4+GPGPG<2<2<2<5<3<+FPZGZP4<5<3<3<3*K2<3<2P<2<7(<2<)F<d<2<3<2P<Q<2<2=*2+RF4Q<Q<(2<2P1(F3=.<3<1(3<PG,G<3P02=FP=F+=P=2P<-3P*J*GP3<2P+2=,=G*F<G(4)",
    c:[false,c[21],c[23],c[22],c[14],c[0],c[15]]
  },
  {
    s:"1111111111111111111111111111111.211*3<2<116<3-F*F,3=2<4<2<,2<F<2(<2(2<4<2<5<,G<G<2<4<6<2<4*GPGPF2<2<3<3<2<2<4*FPZGZP<4<2<Q<2<4<2*L2<3<R<P5<(2<*F<d<F<2<2<Q<)P=2<*3*R(<4<P<*<3P1)<2<P<-FP<2<1(3PF-F=4P02=P<-GP(=Q.3P(G-<F<)3P-3<)=F,H)=2*",
    c:[false,c[21],c[23],c[22],c[14],c[0],c[15]]
  },
  {
    s:"11111111111111111111111111111111112<2<21/<3<5<2-F+F*2<3<3<4<2,2<G<2F<4<3<3<3<2,G=G3<3<4<4<3<+FPGPF<3<3<3<4<3<2*PZGZP2<2<3<2<4<3<3(2(K2<4<Q<P2<3<2(<2<(F<d<F=4R<P(<3P<P-R)2<2<P<P*3P=1(3<P.=Q1)=PF.2=P1(3Q</4<1>P0FP=2/F4F0F<(3+",
    c:[false,c[21],c[23],c[22],c[14],c[0],c[15]]
  },
  {
    s:"1111111111111111111111111111111111)2=2113=2=2-F*F,<2=3=2<2-<G2<*3=2=2=2<2,G3G<2>2=2?2>+FPGPG<2<2>2=2=2<2<(<(PZGZPF<2=2<Q<3<2=2<2<(K2<2=2S2>2<)<)F2d2F2@2P3P=2>-R)<2=2Q2)4P<P1(2=P-=PF312F=2-=2FP1GP2=P,<PF31F3(<3,<3GP/2FP)>P,=PF2+",
    c:[false,c[23],c[21],c[22],c[14],c[0],c[15]]
  },
];



let birdStillLoop = [
  {
    s:"+61,71*4<41*F71)H61(H90G*8.G+2Q3Q2-F+P6R21P2R2S20P6T2.Q3Q2U.Q7U,S2R4T+S9S*T(9Q*S+;*P.F90F(F)F61F*G,",
    c:[false,c[11],c[14],c[12],c[13]]
  },
  {
    s:"11+61,71*<3F41*<71)>80?9/=*7Q-=+2Q3S,<+P6T0P2R2U/P7U2,Q3R3U,R8T+S3R3T*T(9Q2)T*;2)Q-;1<)<61=)<*2)",
    c:[false,c[11],c[12],c[14],c[13]]

  },
  {
    s:"1111+61,71*4<41*F71)H8P/H9Q-H*7R,F,2Q3T16U/P2R3U-Q8U,R3Q4T+S9S+S4R4R*S*9P3*Q,;1F(2F2(31)F(G-",
    c:[false,c[11],c[14],c[12],c[13]]

  },
];
/*

  // bird
  "#1F29C1", // 11: deep blue
  "#FF6638", // 12 beak orange
  "#EAFF30", // 13 wing yellow
  "#FFFFFF", // 14 white
  "#f7d92a" //20 wing shade
*/
let birdFlapLoop = [
  {
    s:"11051,71*91)3<4<2.G+4P4(H)J2(3R2(I(HZH4R2HZJ[G5Q2G[K[F5Q2F[L([5Q2[(H(H)Z6P2Z)H(H*6P2*H(H*8*G*G*7+G*F+7+F/5P21+Q)P1+Q*P1*Q*P1",
    c:[false,c[11],c[14],c[13],c[12],c[20]]
  },
  {
    s:"1111051,71=(3F6.?)6F2(=*A(4P4?(B4Q3(E[4R(E<[5Q>ZA]5Q>ZA)[6P=([?*[6P<*Z?+8<+Z.81*2P51,P51,P)P1,P*P1+Q*P0",
    c:[false,c[11],c[13],c[14],c[12],c[20]]
  },
  {
    s:"11111106*=)=,8(D*2F4F2E<)4P4@ZA(4P3@[?[4Q3?]?5R=[<[([>5R=[(Z*[>5Q<[.[=5Q<Z1(7P<1*71+61,P51+Q*P1+P+P1,P)Q/",
    c:[false,c[11],c[13],c[14],c[12],c[20]]
  },
  {
    s:"11)21*2+31*3*4,>+4(6*@*;(B(6F6(=P=P<6H5(?Z=5F)F5(>[<F4G)G4F>[<F3G+G3F?[F3F-G2@ZFZG/GAZFZ1BZF1(B21*B1+[>1+[*Z1*[*[1.Z1",
    c:[false,c[13],c[11],c[20],c[14],c[12]]
  },
];

let groundImg =  {
    s:"(2(2(6=3<",
    c:[false,c[1],c[2]]
  };

  let babyWalkLoop = [
    {
      s:".41(603<2<303<31(4/:,;3)3)7)3(2+6*2-6)2-604(3/4)3.3,31*3+",
      c:[false,c[1],c[0]]
    },
    {
      s:"-41)513<2<204<315(2.:,9(3*3(7)3)2)7*2(2+51(513(313)3/3*3/2,2+",
      c:[false,c[1],c[0]]
    },
    {
      s:"-41(613<2<204<3150;+9(4*2(7*2*2(7-2*5.2*51(2(313)303*3/2-2)",
      c:[false,c[1],c[0]]
    },
    {
      s:"-41(613<2<204<315)3,:(2*9.9.2(7.2)502(51(2)312*4.3,3-3/",
      c:[false,c[1],c[0]]
    },
  ];

  let babyCarriedLoop = [
    {
      s:"11111)41(603<2<303<31(4/2(8(2*3(;)3(81511110",
      c:[false,c[1],c[0]]
    },
    {
      s:"111111.41(603<2<303<3.2(8(2*3(;)2)8)2.511110",
      c:[false,c[1],c[0]]
    },
    {
      s:"11111111(603<2<303<3-3(7-3(;)2)8(3.511110",
      c:[false,c[1],c[0]]
    },
  ];

  let bgImage = {
    s:"111031/311+5111,<1+51+71(<+;+51-311+31(3(9)5*<(<(<-71,210<11160=(=(=(=1111+<1111.<(<(<.G1111.I11/G.<-M1F1*J-<+OG.G1(N.OK(F(I0OH*OHXH/SNXJSLQG-RGRISLUOGR+RKTOOOGTOOOOOOOOOJ",
    c:[c[8],c[9],c[10],c[6],c[7]],
    w:50
  }

  let trees =[ {
    s:",2111/<)211-2(2(2+2>)211(2(2(>.<F=)2/2(2(2+2(2?2(2)2(2)<G=0=3*2)>F=-AGE)2(2*=F>2(2+2)CF?02=F=(202.?GE<F?(210=L>GB(2*2(2(2+2(2<JAI=2(2(>+>*2)>G<F=M=(2)2(2(2*2>2)=OC(21*AG?J<)2(2(2*2/<2?I=(=G<G<(2,2=1*2@2)<H<G<,2(>21(2(2*2(2(<F<H=2*2?1/2+<G<G=(2(2?21.2(2*=F=F>(=F?(2(211<G<H>G<2(@210=J=G=)2(2(212(2(2*2)<K=F<21/>(2(2*<H=G>102(>2+<H=H<102)2@)<H>G=02-2*2)>F>F<F>F<F</2/2*>2=G<F<F<H<F<*2(2(202>)2(2?F<F<H<F=*2>2.2(2.2(=F<G<F>F<(?2)21,2*<I<H<F@2>11<O?(2)=10=F<G<I>-211<F<G=I</210<O=11.<F<F<I<G<11.<F<F<I<G<11-=F<L<F<11,=G<H=G<F<11+=J<G<G<F=11)=J=G<G=F=11=G=G<H=G<G=/",
    c:[false,c[24],c[16],c[19]],
    w:40
  },
  {
    s:"11)2=/B(@+4=(<+D(?+5?+=(2=F)?+3F2A*?(2F?,3F2*?+>*H7G3)A+=(3<2I3G3->*=2?)H2G31*<)?*H4*?.@,2G3+>0?,2F4,=.A)>2G3,20<*<)=(2G3+21+<,2G5)2112G9<3.=(>(<(2H2,=/B(=2H2+>02H=2(<F2G2+>1)2K2G31*?)8F2F21+>3=)4F2F21,<3=,2F2F21/>+611,2F411,2G411*2F2F2F211*2F2F411*2F2F411)5F2F211(3F2I31",
      c:[false,c[16],c[24],c[19]],
    w:30
  },
  {
    s:"1(3(2,51(3*4(4(=(4*2.4<(<*4)?*3/3>)<3<(?)2(31)<(=*>3)3<1*<3+=4(<2<-3*3(=3*<FA(3+3<(4<)4(<G?)3+4=4<,=F?(=3<2)3*=(<3(>F>)<+4+A3=G>*3+3(5=H3G<F=4(4+2(4)2AF<F=4)31(3+A-202(3)3(<G=*<+3*4?)3(<F=)3>)3*5)>2A)4>4/=2<*=F<*A.3=3*>F@(303)3*<F<F?*3/3.<F<F>+31.<F<F=11*=F<F<11+<G<F<11+<F=F<11+>G<11*<F<F<F<11)=F<F<F<11)<F<G<F=11=F<G<G<1)",
    c:[false,c[24],c[16],c[19]],
    w:30
  }
];

let letters = [
  "(5(2)2(2)8*3*2", //a
  "(4(2*6(2*3*6(", //b
  "(4(2*3+2+2*2(4(",
  "(3)2)2(2*3*3*2(4(", //d
  "(4(2+2+4)2+6", //e
  "(6+2+4)2+2+", //f
  "(4(2*3+2)4*2(4(", //g
  "+3*3*8*3*2", //h
  "(4*2+2+2+2*4(",
  "(5+2+3*2(2(2*2)",
  "(2)2(2)2(2(2(2(2)2)2(2*2", //k
  "(2*2+2+2+2,5",
  "(2)4(4(2(3(2(3*3*2", //m
  "(2)4)3(2(3(2(3)4*2",
  "(4(2*3*3*3*2(4(",
  "(4(2*3*6(2+2+", //p
  "(4(2*3*3*3)2)3(2",
  "(4(2*3*6(2(2)2)3",
  "(4(2,4,2+2(4(",
  "(6(2+2+2+2+2)", //t
  "+3*3*3*3*2(4(", //u
  "+3*2(2(2)2(2*2+2)", //v
  "+3*3(2(3(2(4(4*2", //w
  "+3*2(2(2*2*2(2(2*2", //x
  "(2)2(2)2)3*2)3*2+",
  "(5+2)3)2*2+6", //z
  ")2+2+2+202)", //! 26
  "11.2)", //. 27
  "1.2,2*2.", //, 28
  "+2*2*2+2*2*20", // slash

  ")3)2)3*3*3)2)3.", //0 (30)
  ")2*3+2+2+2*4(",
  "(4(2*2*2*2*2*5-",
  "(4(2*2*2*2(3*2(4(",
  ")2*2+2(2(2)2(5+2(",
  "(5(2+4,3*2(4-",
  ")4(2+4(2*3*2(4-",
  "(5+2+2*2*2+2)",
  ")2*2(2)4(2*3*2(4-",
  ")6)3)6(2+2(4-"

]
