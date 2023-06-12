export const sectionDetail = (text, x, width) =>
  `<TextObject>
<Name>ITextObject9</Name>
<Brushes>
  <BackgroundBrush>
    <SolidColorBrush>
      <Color A="0" R="0" G="0" B="0"></Color>
    </SolidColorBrush>
  </BackgroundBrush>
  <BorderBrush>
    <SolidColorBrush>
      <Color A="1" R="0" G="0" B="0"></Color>
    </SolidColorBrush>
  </BorderBrush>
  <StrokeBrush>
    <SolidColorBrush>
      <Color A="1" R="0" G="0" B="0"></Color>
    </SolidColorBrush>
  </StrokeBrush>
  <FillBrush>
    <SolidColorBrush>
      <Color A="0" R="0" G="0" B="0"></Color>
    </SolidColorBrush>
  </FillBrush>
</Brushes>
<Rotation>Rotation270</Rotation>
<OutlineThickness>1</OutlineThickness>
<IsOutlined>False</IsOutlined>
<BorderStyle>SolidLine</BorderStyle>
<Margin>
  <DYMOThickness Left="0" Top="0" Right="0" Bottom="0" />
</Margin>
<HorizontalAlignment>Left</HorizontalAlignment>
<VerticalAlignment>Top</VerticalAlignment>
<FitMode>None</FitMode>
<IsVertical>False</IsVertical>
<FormattedText>
  <FitMode>None</FitMode>
  <HorizontalAlignment>Left</HorizontalAlignment>
  <VerticalAlignment>Top</VerticalAlignment>
  <IsVertical>False</IsVertical>
  <LineTextSpan>
    <TextSpan>
      <Text>- </Text>
      <FontInfo>
        <FontName>Fira Sans</FontName>
        <FontSize>12</FontSize>
        <IsBold>False</IsBold>
        <IsItalic>False</IsItalic>
        <IsUnderline>False</IsUnderline>
        <FontBrush>
          <SolidColorBrush>
            <Color A="1" R="0" G="0" B="0"></Color>
          </SolidColorBrush>
        </FontBrush>
      </FontInfo>
    </TextSpan>
    <TextSpan>
      <Text>${text}</Text>
      <FontInfo>
        <FontName>Fira Sans</FontName>
        <FontSize>12</FontSize>
        <IsBold>False</IsBold>
        <IsItalic>False</IsItalic>
        <IsUnderline>False</IsUnderline>
        <FontBrush>
          <SolidColorBrush>
            <Color A="1" R="0" G="0" B="0"></Color>
          </SolidColorBrush>
        </FontBrush>
      </FontInfo>
    </TextSpan>
  </LineTextSpan>
</FormattedText>
<ObjectLayout>
  <DYMOPoint>
    <X>${x}</X>
    <Y>0.05666666</Y>
  </DYMOPoint>
  <Size>
    <Width>${width || 0.2174954}</Width>
    <Height>2.216666</Height>
  </Size>
</ObjectLayout>
</TextObject>`;

export const sectionHeader = (text, x) =>
  `<TextObject>
<Name>ITextObject8</Name>
<Brushes>
  <BackgroundBrush>
    <SolidColorBrush>
      <Color A="0" R="0" G="0" B="0"></Color>
    </SolidColorBrush>
  </BackgroundBrush>
  <BorderBrush>
    <SolidColorBrush>
      <Color A="1" R="0" G="0" B="0"></Color>
    </SolidColorBrush>
  </BorderBrush>
  <StrokeBrush>
    <SolidColorBrush>
      <Color A="1" R="0" G="0" B="0"></Color>
    </SolidColorBrush>
  </StrokeBrush>
  <FillBrush>
    <SolidColorBrush>
      <Color A="0" R="0" G="0" B="0"></Color>
    </SolidColorBrush>
  </FillBrush>
</Brushes>
<Rotation>Rotation270</Rotation>
<OutlineThickness>1</OutlineThickness>
<IsOutlined>False</IsOutlined>
<BorderStyle>SolidLine</BorderStyle>
<Margin>
  <DYMOThickness Left="0" Top="0" Right="0" Bottom="0" />
</Margin>
<HorizontalAlignment>Center</HorizontalAlignment>
<VerticalAlignment>Top</VerticalAlignment>
<FitMode>None</FitMode>
<IsVertical>False</IsVertical>
<FormattedText>
  <FitMode>None</FitMode>
  <HorizontalAlignment>Center</HorizontalAlignment>
  <VerticalAlignment>Top</VerticalAlignment>
  <IsVertical>False</IsVertical>
  <LineTextSpan>
    <TextSpan>
      <Text>${text}</Text>
      <FontInfo>
        <FontName>Fira Sans</FontName>
        <FontSize>12</FontSize>
        <IsBold>True</IsBold>
        <IsItalic>False</IsItalic>
        <IsUnderline>False</IsUnderline>
        <FontBrush>
          <SolidColorBrush>
            <Color A="1" R="0" G="0" B="0"></Color>
          </SolidColorBrush>
        </FontBrush>
      </FontInfo>
    </TextSpan>
  </LineTextSpan>
</FormattedText>
<ObjectLayout>
  <DYMOPoint>
    <X>${x}</X>
    <Y>0.05666666</Y>
  </DYMOPoint>
  <Size>
    <Width>0.2194424</Width>
    <Height>2.216667</Height>
  </Size>
</ObjectLayout>
</TextObject>`;

export const label = (
  storeName,
  customerName,
  date,
  time,
  status,
  textObjectsString
) =>
  `<?xml version="1.0" encoding="utf-8"?>
<DesktopLabel Version="1">
  <DYMOLabel Version="3">
    <Description>DYMO Label</Description>
    <Orientation>Landscape</Orientation>
    <LabelName>1933087 Drbl 2-5/16 x 7-1/2 in</LabelName>
    <InitialLength>0</InitialLength>
    <BorderStyle>SolidLine</BorderStyle>
    <DYMORect>
      <DYMOPoint>
        <X>0.22</X>
        <Y>0.05666666</Y>
      </DYMOPoint>
      <Size>
        <Width>7.2</Width>
        <Height>2.216667</Height>
      </Size>
    </DYMORect>
    <BorderColor>
      <SolidColorBrush>
        <Color A="1" R="0" G="0" B="0"></Color>
      </SolidColorBrush>
    </BorderColor>
    <BorderThickness>1</BorderThickness>
    <Show_Border>False</Show_Border>
    <DynamicLayoutManager>
      <RotationBehavior>ClearObjects</RotationBehavior>
      <LabelObjects>
        <TextObject>
          <Name>ITextObject0</Name>
          <Brushes>
            <BackgroundBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BackgroundBrush>
            <BorderBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BorderBrush>
            <StrokeBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </StrokeBrush>
            <FillBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </FillBrush>
          </Brushes>
          <Rotation>Rotation270</Rotation>
          <OutlineThickness>1</OutlineThickness>
          <IsOutlined>False</IsOutlined>
          <BorderStyle>SolidLine</BorderStyle>
          <Margin>
            <DYMOThickness Left="0" Top="0" Right="0" Bottom="0" />
          </Margin>
          <HorizontalAlignment>Center</HorizontalAlignment>
          <VerticalAlignment>Top</VerticalAlignment>
          <FitMode>AlwaysFit</FitMode>
          <IsVertical>False</IsVertical>
          <FormattedText>
            <FitMode>AlwaysFit</FitMode>
            <HorizontalAlignment>Center</HorizontalAlignment>
            <VerticalAlignment>Top</VerticalAlignment>
            <IsVertical>False</IsVertical>
            <LineTextSpan>
              <TextSpan>
                <Text>${storeName}</Text>
                <FontInfo>
                  <FontName>Fira Sans</FontName>
                  <FontSize>1.5</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>False</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
          </FormattedText>
          <ObjectLayout>
            <DYMOPoint>
              <X>0.22</X>
              <Y>0.05666666</Y>
            </DYMOPoint>
            <Size>
              <Width>0.3361073</Width>
              <Height>2.206666</Height>
            </Size>
          </ObjectLayout>
        </TextObject>
        <TextObject>
          <Name>ITextObject1</Name>
          <Brushes>
            <BackgroundBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BackgroundBrush>
            <BorderBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BorderBrush>
            <StrokeBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </StrokeBrush>
            <FillBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </FillBrush>
          </Brushes>
          <Rotation>Rotation270</Rotation>
          <OutlineThickness>1</OutlineThickness>
          <IsOutlined>False</IsOutlined>
          <BorderStyle>SolidLine</BorderStyle>
          <Margin>
            <DYMOThickness Left="0" Top="0" Right="0" Bottom="0" />
          </Margin>
          <HorizontalAlignment>Center</HorizontalAlignment>
          <VerticalAlignment>Top</VerticalAlignment>
          <FitMode>AlwaysFit</FitMode>
          <IsVertical>False</IsVertical>
          <FormattedText>
            <FitMode>AlwaysFit</FitMode>
            <HorizontalAlignment>Center</HorizontalAlignment>
            <VerticalAlignment>Top</VerticalAlignment>
            <IsVertical>False</IsVertical>
            <LineTextSpan>
              <TextSpan>
                <Text>${customerName}</Text>
                <FontInfo>
                  <FontName>Fira Sans</FontName>
                  <FontSize>3.9</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>False</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
          </FormattedText>
          <ObjectLayout>
            <DYMOPoint>
              <X>0.8644398</X>
              <Y>0.05916659</Y>
            </DYMOPoint>
            <Size>
              <Width>0.2666607</Width>
              <Height>2.211667</Height>
            </Size>
          </ObjectLayout>
        </TextObject>
        <TextObject>
          <Name>ITextObject2</Name>
          <Brushes>
            <BackgroundBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BackgroundBrush>
            <BorderBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BorderBrush>
            <StrokeBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </StrokeBrush>
            <FillBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </FillBrush>
          </Brushes>
          <Rotation>Rotation270</Rotation>
          <OutlineThickness>1</OutlineThickness>
          <IsOutlined>False</IsOutlined>
          <BorderStyle>SolidLine</BorderStyle>
          <Margin>
            <DYMOThickness Left="0" Top="0" Right="0" Bottom="0" />
          </Margin>
          <HorizontalAlignment>Center</HorizontalAlignment>
          <VerticalAlignment>Top</VerticalAlignment>
          <FitMode>AlwaysFit</FitMode>
          <IsVertical>False</IsVertical>
          <FormattedText>
            <FitMode>AlwaysFit</FitMode>
            <HorizontalAlignment>Center</HorizontalAlignment>
            <VerticalAlignment>Top</VerticalAlignment>
            <IsVertical>False</IsVertical>
            <LineTextSpan>
              <TextSpan>
                <Text>Order For</Text>
                <FontInfo>
                  <FontName>Fira Sans</FontName>
                  <FontSize>4.8</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>True</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
          </FormattedText>
          <ObjectLayout>
            <DYMOPoint>
              <X>0.5561073</X>
              <Y>0.05666666</Y>
            </DYMOPoint>
            <Size>
              <Width>0.238888</Width>
              <Height>2.214167</Height>
            </Size>
          </ObjectLayout>
        </TextObject>
        <TextObject>
          <Name>ITextObject3</Name>
          <Brushes>
            <BackgroundBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BackgroundBrush>
            <BorderBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BorderBrush>
            <StrokeBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </StrokeBrush>
            <FillBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </FillBrush>
          </Brushes>
          <Rotation>Rotation270</Rotation>
          <OutlineThickness>1</OutlineThickness>
          <IsOutlined>False</IsOutlined>
          <BorderStyle>SolidLine</BorderStyle>
          <Margin>
            <DYMOThickness Left="0" Top="0" Right="0" Bottom="0" />
          </Margin>
          <HorizontalAlignment>Center</HorizontalAlignment>
          <VerticalAlignment>Top</VerticalAlignment>
          <FitMode>AlwaysFit</FitMode>
          <IsVertical>False</IsVertical>
          <FormattedText>
            <FitMode>AlwaysFit</FitMode>
            <HorizontalAlignment>Center</HorizontalAlignment>
            <VerticalAlignment>Top</VerticalAlignment>
            <IsVertical>False</IsVertical>
            <LineTextSpan>
              <TextSpan>
                <Text>${date}</Text>
                <FontInfo>
                  <FontName>Fira Sans</FontName>
                  <FontSize>2.6</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>False</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
          </FormattedText>
          <ObjectLayout>
            <DYMOPoint>
              <X>1.131101</X>
              <Y>0.05916709</Y>
            </DYMOPoint>
            <Size>
              <Width>0.2666607</Width>
              <Height>2.211667</Height>
            </Size>
          </ObjectLayout>
        </TextObject>
        <TextObject>
          <Name>ITextObject4</Name>
          <Brushes>
            <BackgroundBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BackgroundBrush>
            <BorderBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BorderBrush>
            <StrokeBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </StrokeBrush>
            <FillBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </FillBrush>
          </Brushes>
          <Rotation>Rotation270</Rotation>
          <OutlineThickness>1</OutlineThickness>
          <IsOutlined>False</IsOutlined>
          <BorderStyle>SolidLine</BorderStyle>
          <Margin>
            <DYMOThickness Left="0" Top="0" Right="0" Bottom="0" />
          </Margin>
          <HorizontalAlignment>Center</HorizontalAlignment>
          <VerticalAlignment>Top</VerticalAlignment>
          <FitMode>AlwaysFit</FitMode>
          <IsVertical>False</IsVertical>
          <FormattedText>
            <FitMode>AlwaysFit</FitMode>
            <HorizontalAlignment>Center</HorizontalAlignment>
            <VerticalAlignment>Top</VerticalAlignment>
            <IsVertical>False</IsVertical>
            <LineTextSpan>
              <TextSpan>
                <Text>${time}</Text>
                <FontInfo>
                  <FontName>Fira Sans</FontName>
                  <FontSize>5.2</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>False</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
          </FormattedText>
          <ObjectLayout>
            <DYMOPoint>
              <X>1.397761</X>
              <Y>0.05916768</Y>
            </DYMOPoint>
            <Size>
              <Width>0.2666607</Width>
              <Height>2.211667</Height>
            </Size>
          </ObjectLayout>
        </TextObject>
        <TextObject>
          <Name>ITextObject5</Name>
          <Brushes>
            <BackgroundBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BackgroundBrush>
            <BorderBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BorderBrush>
            <StrokeBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </StrokeBrush>
            <FillBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </FillBrush>
          </Brushes>
          <Rotation>Rotation270</Rotation>
          <OutlineThickness>1</OutlineThickness>
          <IsOutlined>False</IsOutlined>
          <BorderStyle>SolidLine</BorderStyle>
          <Margin>
            <DYMOThickness Left="0" Top="0" Right="0" Bottom="0" />
          </Margin>
          <HorizontalAlignment>Center</HorizontalAlignment>
          <VerticalAlignment>Top</VerticalAlignment>
          <FitMode>AlwaysFit</FitMode>
          <IsVertical>False</IsVertical>
          <FormattedText>
            <FitMode>AlwaysFit</FitMode>
            <HorizontalAlignment>Center</HorizontalAlignment>
            <VerticalAlignment>Top</VerticalAlignment>
            <IsVertical>False</IsVertical>
            <LineTextSpan>
              <TextSpan>
                <Text>Order Details</Text>
                <FontInfo>
                  <FontName>Fira Sans</FontName>
                  <FontSize>2.8</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>True</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
          </FormattedText>
          <ObjectLayout>
            <DYMOPoint>
              <X>1.839421</X>
              <Y>0.05916607</Y>
            </DYMOPoint>
            <Size>
              <Width>0.238888</Width>
              <Height>2.214167</Height>
            </Size>
          </ObjectLayout>
        </TextObject>
        <TextObject>
          <Name>ITextObject6</Name>
          <Brushes>
            <BackgroundBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BackgroundBrush>
            <BorderBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BorderBrush>
            <StrokeBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </StrokeBrush>
            <FillBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </FillBrush>
          </Brushes>
          <Rotation>Rotation270</Rotation>
          <OutlineThickness>1</OutlineThickness>
          <IsOutlined>False</IsOutlined>
          <BorderStyle>SolidLine</BorderStyle>
          <Margin>
            <DYMOThickness Left="0" Top="0" Right="0" Bottom="0" />
          </Margin>
          <HorizontalAlignment>Center</HorizontalAlignment>
          <VerticalAlignment>Top</VerticalAlignment>
          <FitMode>AlwaysFit</FitMode>
          <IsVertical>False</IsVertical>
          <FormattedText>
            <FitMode>AlwaysFit</FitMode>
            <HorizontalAlignment>Center</HorizontalAlignment>
            <VerticalAlignment>Top</VerticalAlignment>
            <IsVertical>False</IsVertical>
            <LineTextSpan>
              <TextSpan>
                <Text>${status || "Paid"}</Text>
                <FontInfo>
                  <FontName>Fira Sans</FontName>
                  <FontSize>9.5</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>False</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
          </FormattedText>
          <ObjectLayout>
            <DYMOPoint>
              <X>2.069977</X>
              <Y>0.05916607</Y>
            </DYMOPoint>
            <Size>
              <Width>0.238888</Width>
              <Height>2.214167</Height>
            </Size>
          </ObjectLayout>
        </TextObject>
        <TextObject>
          <Name>ITextObject7</Name>
          <Brushes>
            <BackgroundBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BackgroundBrush>
            <BorderBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BorderBrush>
            <StrokeBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </StrokeBrush>
            <FillBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </FillBrush>
          </Brushes>
          <Rotation>Rotation270</Rotation>
          <OutlineThickness>1</OutlineThickness>
          <IsOutlined>False</IsOutlined>
          <BorderStyle>SolidLine</BorderStyle>
          <Margin>
            <DYMOThickness Left="0" Top="0" Right="0" Bottom="0" />
          </Margin>
          <HorizontalAlignment>Center</HorizontalAlignment>
          <VerticalAlignment>Top</VerticalAlignment>
          <FitMode>AlwaysFit</FitMode>
          <IsVertical>False</IsVertical>
          <FormattedText>
            <FitMode>AlwaysFit</FitMode>
            <HorizontalAlignment>Center</HorizontalAlignment>
            <VerticalAlignment>Top</VerticalAlignment>
            <IsVertical>False</IsVertical>
            <LineTextSpan>
              <TextSpan>
                <Text>Contents</Text>
                <FontInfo>
                  <FontName>Fira Sans</FontName>
                  <FontSize>4.4</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>True</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
          </FormattedText>
          <ObjectLayout>
            <DYMOPoint>
              <X>2.497778</X>
              <Y>0.05916659</Y>
            </DYMOPoint>
            <Size>
              <Width>0.238888</Width>
              <Height>2.214167</Height>
            </Size>
          </ObjectLayout>
        </TextObject>
        ${textObjectsString}
      </LabelObjects>
    </DynamicLayoutManager>
  </DYMOLabel>
  <LabelApplication>Blank</LabelApplication>
  <DataTable>
    <Columns></Columns>
    <Rows></Rows>
  </DataTable>
</DesktopLabel>`;
