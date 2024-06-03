# Hardware

SNiFi project is designed to work with any hardware as long as it supports some particular features which are required for the project to work. The main requirement is to have a network interface card (NIC) that supports promiscuous and monitoring mode. These modes allow the NIC to capture all the packets that are sent through the network, not just the ones that are addressed to the NIC itself. This is crucial for the project to work as it needs to capture all the packets that are sent through the network to analyze them.

## Recommended hardware

### Host -> Raspberry Pi 4

Although SNiFi can run on variety of hardware, we recommend using Raspberry Pi 4 as it is a low-cost device that is capable of running the project with great balance between performance and power consumption.

### Network interface card (NIC) -> Alfa Networks AWUS036ACS

In addition to SBC as RPi4 it is recommended to use a USB Wi-Fi adapter such as inexpensive Alfa Networks AWUS036ACH. This adapter is known for its compatibility with Linux and its ability to work in required modes.

### (Optional) Case

Even though it is not strictly required, it is highly recommended to use a case to protect the Raspberry Pi. You can use off the shelf cases as many are widely available on the market. However you can also use our custom designed case which you can 3D print yourself. A major benefit of using our case is that it is designed specifically to fit Raspberry Pi 4 and Alfa Networks AWUS036ACS adapter, which unlike off-the-shelf cases also protects the adapter. To assemble the case you will also need 4 M2x6 screws and 4 M3x6 screws.

#### Custom case

We have designed a custom case for Raspberry Pi 4 and Alfa Networks AWUS036ACS adapter. The case is designed to fit both devices and protect them from any damage. The case is designed to be easily 3D printable. Models are in 3mf consisting of multiple objects so that they can be individually colored in your slicer of choice. It is recommended to print in primary (blue) and accent (white) colors, but you can choose any color you like. You need to print two models:
* SnifiCase.3mf
* SnifiLid.3mf

#### Printing instructions

Case is designed with 3D printing in mind which means **no supports are required**. It is recommended to print with **0.2mm layer height, 20% infill and 4 wall lines**. You can use any material you like, but we recommend using PLA as it is easy to print and is widely available.

#### Modification

If you want to modify the case, you can use the Fusion 360 source file or STEP file which are available in the hardware directory. You can modify the case to fit different hardware or to change the design to your liking.